// expectations.js — expectSuccess / expectFailure / expectEqual /
// expectStorePath. Ported from filesystem.sh, debug.sh, network.sh,
// fileset/tests.sh.

import { runNix } from "./run_nix.js"
import { runDenix } from "./run_denix.js"
import { assertBothMatch, AssertionError, printFailure } from "./compare.js"

function buildArgs({ expr, json = false, extraFlags = [] }) {
    const args = ["--eval", "--strict"]
    if (json) args.push("--json")
    args.push(...extraFlags, "--expr", expr)
    return args
}

async function runBoth(args, opts) {
    const nixRes = await runNix(args, opts)
    const denixRes = await runDenix(args, opts)
    return { nixRes, denixRes }
}

export async function expectSuccess({ expr, pattern, json = true, extraFlags = [], env, cwd, label }) {
    const args = buildArgs({ expr, json, extraFlags })
    const { nixRes, denixRes } = await runBoth(args, { env, cwd })
    try {
        assertBothMatch({ pattern, nixRes, denixRes, kind: "stdout", label: label || expr })
        return { ok: true }
    } catch (err) {
        if (err instanceof AssertionError) { printFailure(err); Deno.exit(1) }
        throw err
    }
}

export async function expectFailure({ expr, pattern, json = true, extraFlags = [], env, cwd, label }) {
    const args = buildArgs({ expr, json, extraFlags })
    const { nixRes, denixRes } = await runBoth(args, { env, cwd })
    try {
        assertBothMatch({ pattern, nixRes, denixRes, kind: "stderr", label: label || expr })
        return { ok: true }
    } catch (err) {
        if (err instanceof AssertionError) { printFailure(err); Deno.exit(1) }
        throw err
    }
}

export async function expectEqual({ exprA, exprB, json = true, extraFlags = [], env, cwd, label }) {
    const argsA = buildArgs({ expr: exprA, json, extraFlags })
    const argsB = buildArgs({ expr: exprB, json, extraFlags })
    const [resA, resB] = await Promise.all([runDenix(argsA, { env, cwd }), runDenix(argsB, { env, cwd })])
    if (resA.code !== resB.code || resA.stdout !== resB.stdout) {
        console.error(`FAIL: expectEqual${label ? ` — ${label}` : ""}`)
        console.error(`  A: ${JSON.stringify(resA.stdout.trimEnd())} (exit ${resA.code})`)
        console.error(`  B: ${JSON.stringify(resB.stdout.trimEnd())} (exit ${resB.code})`)
        Deno.exit(1)
    }
    return { ok: true }
}

const STORE_PATH_RE = /^"?\/nix\/store\/[a-z0-9]{32}-[^\s"]+"?$/m

export async function expectStorePath({ expr, json = true, extraFlags = [], env, cwd, label }) {
    const args = buildArgs({ expr, json, extraFlags })
    const { nixRes, denixRes } = await runBoth(args, { env, cwd })
    try {
        assertBothMatch({ pattern: STORE_PATH_RE, nixRes, denixRes, kind: "stdout", label: label || expr })
        return { ok: true }
    } catch (err) {
        if (err instanceof AssertionError) { printFailure(err); Deno.exit(1) }
        throw err
    }
}
