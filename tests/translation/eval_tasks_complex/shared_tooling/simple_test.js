// simple_test.js — port of simpleTest() from impure-eval.sh.
//
// Runs both nix-instantiate and denix_eval with the given expression,
// then asserts that stdout (after trimming trailing newlines, matching
// bash $() semantics) exactly equals `expected`.

import { runNix } from "./run_nix.js"
import { runDenix } from "./run_denix.js"
import { AssertionError, printFailure } from "./compare.js"

/**
 * Trim trailing newlines to match bash $() command-substitution semantics.
 */
function trimTrailingNewlines(s) {
    return (s || "").replace(/\n+$/, "")
}

export async function simpleTest({ expr, expected, extraFlags = [], env, cwd, label }) {
    const args = ["--eval", "--impure", "--raw", ...extraFlags, "--expr", expr]
    const opts = {}
    if (env) opts.env = env
    if (cwd) opts.cwd = cwd

    const [nixRes, denixRes] = await Promise.all([
        runNix(args, opts),
        runDenix(args, opts),
    ])

    const denixStdout = trimTrailingNewlines(denixRes.stdout)

    if (!nixRes.missing) {
        const nixStdout = trimTrailingNewlines(nixRes.stdout)

        if (nixStdout !== expected) {
            const err = new AssertionError(
                `nix stdout does not match expected${label ? ` — ${label}` : ""}`,
                { nixRes, denixRes, expected, actual: nixStdout },
            )
            printFailure(err)
            Deno.exit(1)
        }

        if (denixStdout !== expected) {
            const err = new AssertionError(
                `denix stdout does not match expected${label ? ` — ${label}` : ""}`,
                { nixRes, denixRes, expected, actual: denixStdout },
            )
            printFailure(err)
            Deno.exit(1)
        }
    } else {
        // nix unavailable — only check denix against expected.
        if (denixStdout !== expected) {
            const err = new AssertionError(
                `denix stdout does not match expected (nix skipped)${label ? ` — ${label}` : ""}`,
                { denixRes, expected, actual: denixStdout },
            )
            printFailure(err)
            Deno.exit(1)
        }
    }

    return { ok: true }
}
