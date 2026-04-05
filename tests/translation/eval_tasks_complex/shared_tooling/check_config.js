// check_config.js — module-system evalConfig helpers ported from
// nixpkgs_lib_tests/lib/tests/modules.sh.

import { runNix } from "./run_nix.js"
import { runDenix } from "./run_denix.js"
import { resolveFixture, fixtureRootOf } from "./fixtures.js"
import { assertBothMatch, AssertionError, printFailure } from "./compare.js"

const DEFAULT_FIXTURE_ROOT = "nixpkgs_lib/lib/tests/modules"

// Build the -E script the same way modules.sh's evalConfig does:
//     import ./default.nix { modules = [ <m1> <m2> ... ]; }
function buildScript(modules, fixtureRoot) {
    const root = fixtureRootOf(fixtureRoot)
    // Each module path in the .sh is written relative to the modules/ dir,
    // e.g. "./shorthand-meta.nix". Rewrite as absolute paths so we are
    // independent of cwd.
    const pieces = modules.map((m) => {
        if (m.startsWith("{") || m.startsWith("(")) {
            // inline expression — pass through
            return m
        }
        return resolveFixture(m, fixtureRoot)
    })
    return `import ${root}default.nix { modules = [ ${pieces.join(" ")} ]; }`
}

function commonArgs({ attr, script, extraFlags = [] }) {
    const args = [
        "--timeout", "1",
        "--eval-only",
        "--show-trace",
        "--read-write-mode",
        "--json",
        ...extraFlags,
        "-E", script,
    ]
    if (attr) { args.push("-A", attr) }
    return args
}

export async function evalConfig({ attr, modules, fixtureRoot = DEFAULT_FIXTURE_ROOT, extraFlags = [] }) {
    const script = buildScript(modules, fixtureRoot)
    const args = commonArgs({ attr, script, extraFlags })
    const nixRes = await runNix(args)
    const denixRes = await runDenix(args)
    return { nixRes, denixRes, script }
}

export async function checkConfigOutput({ pattern, attr, modules, fixtureRoot = DEFAULT_FIXTURE_ROOT, label }) {
    const { nixRes, denixRes } = await evalConfig({ attr, modules, fixtureRoot })
    try {
        assertBothMatch({ pattern, nixRes, denixRes, kind: "stdout", label: label || attr })
        return { ok: true }
    } catch (err) {
        if (err instanceof AssertionError) { printFailure(err); Deno.exit(1) }
        throw err
    }
}

export async function checkConfigError({ pattern, attr, modules, fixtureRoot = DEFAULT_FIXTURE_ROOT, label }) {
    const { nixRes, denixRes } = await evalConfig({ attr, modules, fixtureRoot })
    try {
        assertBothMatch({ pattern, nixRes, denixRes, kind: "stderr", label: label || attr })
        return { ok: true }
    } catch (err) {
        if (err instanceof AssertionError) { printFailure(err); Deno.exit(1) }
        throw err
    }
}

// Minimal REQUIRE_INFINITE_RECURSION_HINT gate (ported from modules.sh:110).
export function globalErrorLogCheck(errText, { requireInfiniteRecursionHint = false } = {}) {
    const hasHint = /if you get an infinite recursion here/i.test(errText)
    if (requireInfiniteRecursionHint) return hasHint
    return !hasHint
}
