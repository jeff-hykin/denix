// check_expression.js — port of checkExpression() from modules.sh.
//
// Evaluates a Nix file with --eval --strict and asserts both nix and
// denix exit successfully (code 0).

import { runNix } from "./run_nix.js"
import { runDenix } from "./run_denix.js"
import { AssertionError, printFailure, formatResult } from "./compare.js"

export async function checkExpression({ path, label }) {
    const args = ["--eval", "--strict", path]

    const nixRes = await runNix(args)
    const denixRes = await runDenix(args)

    const tag = label || path

    // If nix is unavailable, only check denix.
    if (nixRes.missing) {
        if (denixRes.code !== 0) {
            const err = new AssertionError(
                `denix failed to evaluate expression (nix skipped) — ${tag}`,
                { denixRes },
            )
            printFailure(err)
            Deno.exit(1)
        }
        return { ok: true, nix: null, denix: true }
    }

    // Both runners available — assert both succeed.
    let failed = false

    if (nixRes.code !== 0) {
        console.error(`FAIL [nix]: ${tag}`)
        console.error(formatResult("  nix", nixRes))
        failed = true
    }

    if (denixRes.code !== 0) {
        console.error(`FAIL [denix]: ${tag}`)
        console.error(formatResult("  denix", denixRes))
        failed = true
    }

    if (failed) {
        Deno.exit(1)
    }

    return { ok: true, nix: true, denix: true }
}
