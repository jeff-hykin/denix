// expect_trace.js — port of expect_trace() from function-trace.sh.
//
// Runs both nix-instantiate and denix_eval with --trace-function-calls,
// filters for "function-trace" lines, strips trailing numbers, and
// compares the results.

import { runNix } from "./run_nix.js"
import { runDenix } from "./run_denix.js"
import { AssertionError, printFailure } from "./compare.js"

/**
 * Extract function-trace lines from combined stdout+stderr,
 * stripping trailing whitespace+digits (matching `sed -e 's/ [0-9]*$//'`).
 */
function extractTrace(result) {
    const combined = (result.stdout || "") + (result.stderr || "")
    return combined
        .split("\n")
        .filter(line => line.includes("function-trace"))
        .map(line => line.replace(/\s+\d+$/, ""))
        .join("\n")
}

/**
 * Compare two strings ignoring leading/trailing whitespace and
 * collapsing runs of blank lines (like diff -swB).
 */
function normalizeForCompare(s) {
    return s
        .trim()
        .split("\n")
        .filter(line => line.trim() !== "")
        .join("\n")
}

export async function expectTrace({ expr, expected, label }) {
    const args = ["--trace-function-calls", "--expr", expr]
    const [nixRes, denixRes] = await Promise.all([
        runNix(args),
        runDenix(args),
    ])

    const denixTrace = extractTrace(denixRes)
    const nixTrace = nixRes.missing ? null : extractTrace(nixRes)

    const normDenix = normalizeForCompare(denixTrace)
    const normExpected = normalizeForCompare(expected || "")

    if (nixTrace != null) {
        // Cross-check: denix output should match nix output.
        const normNix = normalizeForCompare(nixTrace)
        if (normDenix !== normNix) {
            const err = new AssertionError(
                `trace mismatch between nix and denix${label ? ` — ${label}` : ""}`,
                { nixRes, denixRes, expected: normNix, actual: normDenix },
            )
            printFailure(err)
            throw err
        }
        // Also verify nix matches expected (sanity check).
        if (normExpected && normNix !== normExpected) {
            const err = new AssertionError(
                `nix trace does not match expected${label ? ` — ${label}` : ""}`,
                { nixRes, denixRes, expected: normExpected, actual: normNix },
            )
            printFailure(err)
            throw err
        }
    } else {
        // nix unavailable — compare denix against expected directly.
        if (normDenix !== normExpected) {
            const err = new AssertionError(
                `denix trace does not match expected (nix skipped)${label ? ` — ${label}` : ""}`,
                { denixRes, expected: normExpected, actual: normDenix },
            )
            printFailure(err)
            throw err
        }
    }

    return { ok: true }
}
