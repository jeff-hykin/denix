// build_asserts.js — Assertion helpers for derivation build tests.
//
// These wrap the internal_repl API for the common test patterns found
// in simple.sh, build.sh, dependencies.sh, etc.

import { AssertionError, printFailure } from "./compare.js"

/**
 * Assert that building a derivation succeeds and its output paths exist.
 *
 * @param {object} sess — internal repl session
 * @param {object} drv — derivation object
 * @param {object} opts
 * @param {string[]} [opts.outputs] — output names to check (default: ["out"])
 * @param {string} [opts.file] — relative file path within output to check
 * @param {RegExp|string} [opts.content] — regex/string to match against file content
 * @param {string} [opts.label]
 */
export async function assertBuilt(sess, drv, opts = {}) {
    const { outputs = ["out"], file, content, label } = opts
    let result
    try {
        result = await sess.build(drv)
    } catch (err) {
        const e = new AssertionError(
            `build failed${label ? ` — ${label}` : ""}: ${err.message}`,
            { drv, error: err }
        )
        printFailure(e)
        Deno.exit(1)
    }

    // Check that output paths exist
    for (const outName of outputs) {
        const outPath = result.outputPaths[outName]
        if (!outPath) {
            const e = new AssertionError(
                `missing output '${outName}'${label ? ` — ${label}` : ""}`,
                { drv, outputPaths: result.outputPaths }
            )
            printFailure(e)
            Deno.exit(1)
        }
        try {
            await Deno.stat(outPath)
        } catch {
            const e = new AssertionError(
                `output path does not exist: ${outPath}${label ? ` — ${label}` : ""}`,
                { drv, outputPaths: result.outputPaths }
            )
            printFailure(e)
            Deno.exit(1)
        }
    }

    // Optionally check file content within an output
    if (file) {
        const outPath = result.outputPaths[outputs[0]]
        const filePath = `${outPath}/${file}`
        let fileContent
        try {
            fileContent = await Deno.readTextFile(filePath)
        } catch (err) {
            const e = new AssertionError(
                `cannot read ${filePath}${label ? ` — ${label}` : ""}: ${err.message}`,
                { drv, filePath }
            )
            printFailure(e)
            Deno.exit(1)
        }
        if (content != null) {
            const pat = content instanceof RegExp ? content : new RegExp(`^${content}$`)
            if (!pat.test(fileContent.trimEnd())) {
                const e = new AssertionError(
                    `file content mismatch in ${file}${label ? ` — ${label}` : ""}`,
                    { expected: String(content), actual: fileContent.trimEnd() }
                )
                printFailure(e)
                Deno.exit(1)
            }
        }
    }

    return result
}

/**
 * Assert that building the same derivation twice results in a cache hit
 * on the second build (builder is not re-executed).
 */
export async function assertCacheHit(sess, drv, opts = {}) {
    const { label } = opts

    // First build
    const r1 = await sess.build(drv)
    if (r1.cached) {
        // Already cached from a prior run — still valid
        return r1
    }

    // Second build — should be a cache hit
    const r2 = await sess.build(drv)
    if (!r2.cached) {
        const e = new AssertionError(
            `expected cache hit on second build${label ? ` — ${label}` : ""}`,
            { drv, firstResult: r1, secondResult: r2 }
        )
        printFailure(e)
        Deno.exit(1)
    }

    return r2
}

/**
 * Assert that building a derivation fails with an error matching a pattern.
 */
export async function assertBuildFails(sess, drv, opts = {}) {
    const { pattern, label } = opts
    try {
        await sess.build(drv)
        const e = new AssertionError(
            `build should have failed${label ? ` — ${label}` : ""}`,
            { drv }
        )
        printFailure(e)
        Deno.exit(1)
    } catch (err) {
        if (pattern) {
            const pat = pattern instanceof RegExp ? pattern : new RegExp(pattern)
            if (!pat.test(err.message)) {
                const e = new AssertionError(
                    `build error did not match pattern${label ? ` — ${label}` : ""}`,
                    { expected: String(pattern), actual: err.message }
                )
                printFailure(e)
                Deno.exit(1)
            }
        }
        return { error: err }
    }
}

/**
 * Read a file from a built derivation output.
 */
export async function readOutput(outputPath, relFile) {
    const fullPath = `${outputPath}/${relFile}`
    return await Deno.readTextFile(fullPath)
}
