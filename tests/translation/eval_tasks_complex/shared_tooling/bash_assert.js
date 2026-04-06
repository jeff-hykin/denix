// bash_assert.js — reusable helper for the [[ $(nix eval ...) == 'expected' ]]
// pattern used by translate_bashassert_tests.
//
// Centralises the runDenix + runNix + trim-and-compare logic so that
// generated tests don't need to inline it.

import { runDenix } from "./run_denix.js"
import { runNix } from "./run_nix.js"
import { AssertionError, printFailure } from "./compare.js"

/**
 * Trim trailing newlines to match bash $() semantics.
 */
function trimTrailingNewlines(s) {
    return (s || "").replace(/\n+$/, "")
}

/**
 * @param {object}   opts
 * @param {string[]} opts.args     - args for runDenix / runNix (e.g. ["--eval", "--json", "file.nix"])
 * @param {string}   opts.expected - expected stdout after trimming trailing newlines
 * @param {string}   [opts.op="=="] - "==" for equality, "!=" for negated assertion
 * @param {string}   [opts.label]  - optional label for error messages
 */
export async function bashAssert({ args, expected, op = "==", label }) {
    const [denixRes, nixRes] = await Promise.all([
        runDenix(args),
        runNix(args),
    ])

    const denixOut = trimTrailingNewlines(denixRes.stdout)
    const nixOut   = trimTrailingNewlines(nixRes.stdout)

    const denixMatch = (op === "==")
        ? (denixOut === expected && denixRes.code === 0)
        : (denixOut !== expected)

    if (nixRes.missing) {
        // nix unavailable — only check denix against expected
        if (!denixMatch) {
            const err = new AssertionError(
                `denix ${op} assertion failed (nix skipped)${label ? ` — ${label}` : ""}`,
                {
                    args,
                    expected,
                    op,
                    actual: denixOut,
                    stderr: denixRes.stderr,
                    exitCode: denixRes.code,
                    denixRes,
                },
            )
            printFailure(err)
            Deno.exit(1)
        }
        return
    }

    // nix is available — cross-check
    const nixMatch = (op === "==")
        ? (nixOut === expected && nixRes.code === 0)
        : (nixOut !== expected)

    if (!denixMatch || !nixMatch) {
        const err = new AssertionError(
            `assertion failed: nix=${nixMatch} denix=${denixMatch} op=${op}${label ? ` — ${label}` : ""}`,
            {
                args,
                expected,
                op,
                denixActual: denixOut,
                nixActual: nixOut,
                denixStderr: denixRes.stderr,
                nixStderr: nixRes.stderr,
                denixExitCode: denixRes.code,
                nixExitCode: nixRes.code,
                denixRes,
                nixRes,
            },
        )
        printFailure(err)
        Deno.exit(1)
    }

    if (denixMatch !== nixMatch) {
        const err = new AssertionError(
            `cross-check divergence: nix=${nixMatch} denix=${denixMatch} op=${op}${label ? ` — ${label}` : ""}`,
            {
                args,
                expected,
                op,
                denixActual: denixOut,
                nixActual: nixOut,
                denixRes,
                nixRes,
            },
        )
        printFailure(err)
        Deno.exit(1)
    }
}
