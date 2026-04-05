#!/usr/bin/env -S deno run --allow-all
// A spy/shim that is invoked in place of `nix-instantiate` during the
// upstream Nix lang test harness. For every invocation that references a
// `.nix` file in argv, it records the exact CLI, env, and cwd to a JSON
// file so test invocations can later be replayed without needing the
// Meson/bash harness to regenerate them. Then it execs the real
// nix-instantiate so the outer harness keeps running normally.
//
// Required env vars (set by the runner):
//   NIX_EVAL_SHIM_REAL          absolute path to the real nix-instantiate
//   NIX_EVAL_SHIM_RECORD_DIR    where JSON files get written
//
// Output: $RECORD_DIR/<nix-file-path-without-extension>_eval.json

// Tiny inline path helpers. We can't use jsr:@std/path because the
// harness sets HOME=/fake-home for each test, which means Deno can't
// resolve its module cache and network fetch is blocked.
const path = {
    join: (...parts: string[]) => parts.join("/").replace(/\/+/g, "/"),
    dirname: (p: string) => {
        const i = p.lastIndexOf("/")
        return i < 0 ? "." : (i === 0 ? "/" : p.slice(0, i))
    },
    resolve: (base: string, p: string) => p.startsWith("/") ? p : `${base}/${p}`.replace(/\/+/g, "/"),
}

const REAL_BIN   = Deno.env.get("NIX_EVAL_SHIM_REAL")
const RECORD_DIR = Deno.env.get("NIX_EVAL_SHIM_RECORD_DIR")
if (!REAL_BIN)   { console.error("nix_eval_spy: NIX_EVAL_SHIM_REAL unset");   Deno.exit(127) }
if (!RECORD_DIR) { console.error("nix_eval_spy: NIX_EVAL_SHIM_RECORD_DIR unset"); Deno.exit(127) }

const argv = [...Deno.args]
const cwd  = Deno.cwd()
const rawEnv = Deno.env.toObject()

// Allowlist: only keep env vars the Nix lang test suite could plausibly
// reference. Everything else (CLAUDE_*, VSCODE_*, HOMEBREW_*, STARSHIP_*,
// FNM_*, EXA_*, terminal junk, etc.) is machine-specific noise that would
// make these records non-portable. The tests only ever read env via
// `builtins.getEnv "NAME"`, and the names they read are well-known:
//   TEST_VAR, IMPURE_VAR1, IMPURE_VAR2, HOME, NIX_PATH, ...
const ALLOWED_EXACT = new Set([
    // identity / locale / basic shell
    "HOME", "PATH", "SHELL", "USER", "LOGNAME", "PWD", "OLDPWD",
    "TMPDIR", "TMP", "TEMP", "LANG", "LC_ALL", "LC_CTYPE", "LC_COLLATE",
    "LC_MESSAGES", "LC_NUMERIC", "LC_TIME", "PAGER", "EDITOR",

    // explicitly set by lang.sh / vars.sh for test determinism
    "TEST_VAR", "IMPURE_VAR1", "IMPURE_VAR2",

    // git isolation vars set by vars.sh
    "GIT_CONFIG_SYSTEM", "GIT_CONFIG_GLOBAL",

    // harness internals (some tests / error messages may reference these)
    "TEST_ROOT", "TEST_HOME", "TEST_SUITE_NAME", "TEST_NAME",
])
const ALLOWED_PREFIXES = [
    // all of these are read by either nix itself or the test harness
    "NIX_", "_NIX_",
]

const env: Record<string, string> = {}
for (const [k, v] of Object.entries(rawEnv)) {
    // never leak our own spy control vars
    if (k === "NIX_EVAL_SHIM_REAL" || k === "NIX_EVAL_SHIM_RECORD_DIR" || k === "NIX_EVAL_SHIM_SCRIPT") continue
    if (ALLOWED_EXACT.has(k) || ALLOWED_PREFIXES.some(p => k.startsWith(p))) {
        env[k] = v
    }
}

// Find the .nix file argument (skip `-E`, `--expr`, flag values, `-`, etc.).
// We only record invocations that actually evaluate a file on disk.
function findNixFile(args: string[]): string | null {
    for (let i = 0; i < args.length; i++) {
        const a = args[i]
        // argument that looks like a flag-value pair to skip
        if (a === "--arg" || a === "--argstr") { i += 2; continue }
        if (a.startsWith("-")) continue
        if (a.endsWith(".nix")) return a
    }
    return null
}

const nixFile = findNixFile(argv)

if (nixFile) {
    // Resolve the record path. `nixFile` is typically a relative path
    // like "lang/eval-okay-arithmetic.nix". We mirror that path layout
    // under RECORD_DIR so records are easy to locate.
    const relStem = nixFile.replace(/\.nix$/, "")
    const outPath = path.join(RECORD_DIR, `${relStem}_eval.json`)
    await Deno.mkdir(path.dirname(outPath), { recursive: true })

    // Also surface side-inputs the harness uses per-test, so a replayer
    // doesn't need to re-derive them.
    const flagsPath = `${relStem}.flags`
    const expPath   = `${relStem}.exp`
    const errExpPath = `${relStem}.err.exp`
    const expXmlPath = `${relStem}.exp.xml`

    const exists = async (p: string) => {
        try { await Deno.stat(p); return true } catch { return false }
    }
    const readIfExists = async (p: string) => {
        try { return await Deno.readTextFile(p) } catch { return null }
    }

    const record = {
        nix_file:     nixFile,                    // as passed to nix-instantiate
        nix_file_abs: path.resolve(cwd, nixFile),
        cwd,
        argv:         [REAL_BIN, ...argv],        // full command line, bin first
        env,                                       // all env vars, fully stringified
        side_inputs: {
            flags_file:     await exists(path.resolve(cwd, flagsPath))    ? flagsPath    : null,
            flags_content:  await readIfExists(path.resolve(cwd, flagsPath)),
            exp_file:       await exists(path.resolve(cwd, expPath))      ? expPath      : null,
            err_exp_file:   await exists(path.resolve(cwd, errExpPath))   ? errExpPath   : null,
            exp_xml_file:   await exists(path.resolve(cwd, expXmlPath))   ? expXmlPath   : null,
        },
        recorded_at:  new Date().toISOString(),
    }

    await Deno.writeTextFile(outPath, JSON.stringify(record, null, 4))
}

// Exec the real nix-instantiate with the original argv, inheriting stdio.
const child = new Deno.Command(REAL_BIN!, {
    args: argv,
    stdin:  "inherit",
    stdout: "inherit",
    stderr: "inherit",
}).spawn()
const status = await child.status
Deno.exit(status.code)
