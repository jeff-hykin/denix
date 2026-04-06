// minor_helpers.js — small helpers ported from various bash test scripts.
//
// varTest      (impure-env.sh)
// checkFilter  (filter-source.sh)
// diffAndAccept (cli-characterisation.sh)
// reportFailure (modules.sh)

import { runDenix } from "./run_denix.js"
import { runNix } from "./run_nix.js"
import { AssertionError, printFailure } from "./compare.js"
import { evalConfig } from "./check_config.js"

// ---------------------------------------------------------------------------
// varTest — ported from impure-env.sh
//
// Original:
//   nix build --no-link -vL --argstr var "$var" --argstr value "$value" \
//       --impure "$@" --file impure-env.nix
// ---------------------------------------------------------------------------

export async function varTest({ varName, value, extraFlags = [], file, env, cwd, label }) {
    const args = [
        "--eval-only",
        "--argstr", "var", varName,
        "--argstr", "value", value,
        "--impure",
        ...extraFlags,
    ]
    if (file) {
        args.push("--file", file)
    }

    const opts = {}
    if (env) opts.env = env
    if (cwd) opts.cwd = cwd

    const denixRes = await runDenix(args, opts)

    if (denixRes.code !== 0) {
        const err = new AssertionError(
            `varTest failed for var=${varName} value=${value}${label ? ` — ${label}` : ""}`,
            { denixRes, varName, value },
        )
        printFailure(err)
        Deno.exit(1)
    }

    return { ok: true }
}

// ---------------------------------------------------------------------------
// checkFilter — ported from filter-source.sh
//
// Original:
//   test ! -e "$1/foo/bar"
//   test -e "$1/xyzzy"
//   test -e "$1/bak"
//   test ! -e "$1"/bla.c.bak
//   test ! -L "$1/link"
// ---------------------------------------------------------------------------

async function exists(path) {
    try { await Deno.stat(path); return true } catch { return false }
}

async function isSymlink(path) {
    try {
        const info = await Deno.lstat(path)
        return info.isSymlink
    } catch {
        return false
    }
}

export async function checkFilter({ dir, label }) {
    const checks = [
        { path: `${dir}/foo/bar`,   shouldExist: false, desc: "foo/bar should NOT exist" },
        { path: `${dir}/xyzzy`,     shouldExist: true,  desc: "xyzzy should exist" },
        { path: `${dir}/bak`,       shouldExist: true,  desc: "bak should exist" },
        { path: `${dir}/bla.c.bak`, shouldExist: false, desc: "bla.c.bak should NOT exist" },
    ]

    for (const c of checks) {
        const e = await exists(c.path)
        if (e !== c.shouldExist) {
            console.error(`checkFilter FAIL: ${c.desc} (got exists=${e})${label ? ` — ${label}` : ""}`)
            Deno.exit(1)
        }
    }

    // "test ! -L link" — must not be a symlink (may or may not exist)
    if (await isSymlink(`${dir}/link`)) {
        console.error(`checkFilter FAIL: link should NOT be a symlink${label ? ` — ${label}` : ""}`)
        Deno.exit(1)
    }

    return { ok: true }
}

// ---------------------------------------------------------------------------
// diffAndAccept — ported from cli-characterisation.sh
//
// Original:
//   got="cli-characterisation/$testName.$2"
//   expected="cli-characterisation/$testName.$3"
//   diffAndAcceptInner "$testName" "$got" "$expected"
// ---------------------------------------------------------------------------

export async function diffAndAccept({ testName, gotExt, expectedExt, fixtureDir, label }) {
    const dir = fixtureDir || "cli-characterisation"
    const gotPath = `${dir}/${testName}.${gotExt}`
    const expectedPath = `${dir}/${testName}.${expectedExt}`

    let gotContents, expectedContents
    try {
        gotContents = await Deno.readTextFile(gotPath)
    } catch (e) {
        console.error(`diffAndAccept FAIL: cannot read got file ${gotPath}: ${e.message}${label ? ` — ${label}` : ""}`)
        Deno.exit(1)
    }
    try {
        expectedContents = await Deno.readTextFile(expectedPath)
    } catch (e) {
        console.error(`diffAndAccept FAIL: cannot read expected file ${expectedPath}: ${e.message}${label ? ` — ${label}` : ""}`)
        Deno.exit(1)
    }

    if (gotContents !== expectedContents) {
        console.error(`diffAndAccept FAIL: ${testName}${label ? ` — ${label}` : ""}`)
        console.error(`  got file:      ${gotPath}`)
        console.error(`  expected file: ${expectedPath}`)
        // Show a simple line-by-line diff summary
        const gotLines = gotContents.split("\n")
        const expectedLines = expectedContents.split("\n")
        const maxLines = Math.max(gotLines.length, expectedLines.length)
        for (let i = 0; i < maxLines; i++) {
            if (gotLines[i] !== expectedLines[i]) {
                console.error(`  first difference at line ${i + 1}:`)
                console.error(`    got:      ${JSON.stringify(gotLines[i] ?? "<EOF>")}`)
                console.error(`    expected: ${JSON.stringify(expectedLines[i] ?? "<EOF>")}`)
                break
            }
        }
        Deno.exit(1)
    }

    return { ok: true }
}

// ---------------------------------------------------------------------------
// reportFailure — ported from modules.sh
//
// Used to run evalConfig expecting failure, log the output, and exit 1.
// ---------------------------------------------------------------------------

export async function reportFailure({ attr, modules, fixtureRoot, label }) {
    const { nixRes, denixRes, script } = await evalConfig({
        attr,
        modules,
        ...(fixtureRoot ? { fixtureRoot } : {}),
    })

    const tag = label || attr || modules.join(", ")
    console.error(`reportFailure: ${tag}`)
    if (nixRes && !nixRes.missing) {
        console.error(`  nix  exit=${nixRes.code} stdout=${JSON.stringify((nixRes.stdout || "").trimEnd())}`)
        if (nixRes.stderr) console.error(`  nix  stderr=${JSON.stringify(nixRes.stderr.trimEnd())}`)
    }
    console.error(`  denix exit=${denixRes.code} stdout=${JSON.stringify((denixRes.stdout || "").trimEnd())}`)
    if (denixRes.stderr) console.error(`  denix stderr=${JSON.stringify(denixRes.stderr.trimEnd())}`)

    Deno.exit(1)
}
