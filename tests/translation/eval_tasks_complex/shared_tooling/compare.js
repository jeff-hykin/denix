// compare.js — cross-runner comparison helpers.
//
// Each helper asserts the expected condition on the nix-instantiate
// result AND that denix_eval exhibits the same pass/fail shape w.r.t.
// the assertion. Divergence throws an AssertionError that TAP-prints a
// structured report.

export class AssertionError extends Error {
    constructor(msg, details) {
        super(msg)
        this.name = "AssertionError"
        this.details = details || {}
    }
}

export function formatResult(tag, r) {
    if (!r) return `${tag}: <absent>`
    if (r.missing) return `${tag}: <skipped: ${r.stderr || "missing"}>`
    const stdout = (r.stdout || "").trimEnd()
    const stderr = (r.stderr || "").trimEnd()
    return `${tag}:\n  exit: ${r.code}\n  stdout: ${JSON.stringify(stdout)}\n  stderr: ${JSON.stringify(stderr)}`
}

function toRegex(pat) {
    if (pat instanceof RegExp) return pat
    return new RegExp(pat)
}

export function stdoutMatches(result, pattern) {
    if (!result || result.missing) return null  // inconclusive
    if (result.code !== 0) return false
    // Bash `$()` strips the trailing newline before regex-matching, so
    // do the same here.
    return toRegex(pattern).test((result.stdout || "").replace(/\n+$/, ""))
}

export function stderrMatches(result, pattern) {
    if (!result || result.missing) return null
    if (result.code === 0) return false
    return toRegex(pattern).test((result.stderr || "").replace(/\n+$/, ""))
}

export function assertBothMatch({ pattern, nixRes, denixRes, kind = "stdout", label }) {
    const matcher = kind === "stderr" ? stderrMatches : stdoutMatches
    const nixOk = matcher(nixRes, pattern)
    const denixOk = matcher(denixRes, pattern)

    // If nix-instantiate is unavailable, we can't cross-check; we still
    // assert denix behaves correctly against the pattern.
    if (nixOk === null) {
        if (denixOk !== true) {
            throw new AssertionError(
                `denix did not match ${kind}:${pattern} (nix skipped)${label ? ` — ${label}` : ""}`,
                { nixRes, denixRes, pattern, kind },
            )
        }
        return { denix: true, nix: null }
    }

    if (nixOk !== denixOk || nixOk !== true) {
        throw new AssertionError(
            `mismatch or failure: nix=${nixOk} denix=${denixOk} pattern=${pattern}${label ? ` — ${label}` : ""}`,
            { nixRes, denixRes, pattern, kind },
        )
    }
    return { nix: nixOk, denix: denixOk }
}

export function printFailure(err) {
    const d = err.details || {}
    const lines = [`FAIL: ${err.message}`]
    if (d.pattern) lines.push(`  pattern: ${d.pattern}`)
    if (d.nixRes)   lines.push(formatResult("  nix", d.nixRes))
    if (d.denixRes) lines.push(formatResult("  denix", d.denixRes))
    console.error(lines.join("\n"))
}
