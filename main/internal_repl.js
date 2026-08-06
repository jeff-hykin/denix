/**
 * Internal REPL — a JS API (not a CLI/product surface) for test tooling.
 *
 * Provides a persistent evaluation session that can:
 *   - Evaluate nix expressions (with state across calls)
 *   - Resolve attribute paths
 *   - Build derivations (via main/builder.js)
 *   - Inspect build outputs
 *
 * Shape:
 *   const sess = await createInternalRepl({ storeRoot: "./temp_nix/store" })
 *   const val = await sess.eval(`1 + 2`)           // => 3
 *   const drv = await sess.eval(`derivation { name = "hello"; ... }`)
 *   const { outputPaths } = await sess.build(drv)
 *   await sess.close()
 */

import { createRuntime } from "./runtime.js"
import { build, checkCacheHit } from "./builder.js"

/**
 * Create an internal REPL session.
 *
 * @param {object} opts
 * @param {string} [opts.storeRoot] — relocatable store directory
 * @param {Record<string, string>} [opts.env] — extra env vars for builds
 * @returns {Promise<InternalReplSession>}
 */
export async function createInternalRepl(opts = {}) {
    const storeRoot = opts.storeRoot || Deno.env.get("DENIX_STORE_ROOT")
    if (storeRoot) {
        Deno.env.set("DENIX_STORE_ROOT", storeRoot)
        await Deno.mkdir(storeRoot, { recursive: true })
    }

    // createRuntime() returns { createFunc, createScope, defGetter, runtime }
    // where runtime is the "runtimeWithScope" object containing:
    //   .scopeStack, .rootScope, .runtime (inner), .operators, .importCache
    // The builtins live on the inner runtime object.
    const rtResult = createRuntime()
    const runtimeWithScope = rtResult.runtime
    const innerRuntime = runtimeWithScope.runtime
    const builtins = innerRuntime.builtins
    const operators = runtimeWithScope.operators || innerRuntime.operators
    const nixScope = runtimeWithScope.scopeStack[runtimeWithScope.scopeStack.length - 1]
    let lastBuildLog = ""

    return {
        /**
         * Evaluate a nix expression string. Returns the JS-side value.
         * NOTE: This is a skeleton — it delegates to denix's translator
         * and evaluates the resulting JS. For complex expressions that
         * require imports, use sess.evalFile() instead.
         */
        async eval(exprString) {
            // Dynamic import to avoid circular deps at module load time
            const { convertToJsSync } = await import("../translator.js")
            // The translator emits a full module: a preamble wiring up the
            // runtime, then `export default <expr>`. We already have the
            // runtime, so evaluate just the trailing expression (same
            // approach as loadNixFileSync in import_loader.js).
            const jsCode = convertToJsSync(exprString)
            const marker = "export default "
            const markerIdx = jsCode.lastIndexOf(marker)
            const cleanCode = (markerIdx >= 0 ? jsCode.slice(markerIdx + marker.length) : jsCode).trim()

            const fn = new Function(
                "runtime", "operators", "builtins", "nixScope",
                "InterpolatedString", "Path",
                "createFunc", "createScope", "defGetter",
                "apply", "set", "force", "mkThunk",
                `return (${cleanCode}\n)`
            )
            return fn(
                runtimeWithScope, operators, builtins, nixScope,
                innerRuntime.InterpolatedString, innerRuntime.Path,
                rtResult.createFunc, rtResult.createScope, rtResult.defGetter,
                rtResult.apply, rtResult.set, rtResult.force, rtResult.mkThunk,
            )
        },

        /**
         * Select an attribute path from a previously evaluated value.
         */
        attr(value, path) {
            const parts = path.split(".")
            let current = value
            for (const part of parts) {
                if (current == null || typeof current !== "object") {
                    throw new Error(`Cannot access '${part}' on ${typeof current}`)
                }
                current = current[part]
            }
            return current
        },

        /**
         * Build a derivation and return its output paths.
         * Detects cache hits automatically.
         */
        async build(drv) {
            if (!drv || drv.type !== "derivation") {
                throw new Error("build() expects a derivation object")
            }
            const result = await build(drv, { storeRoot })
            lastBuildLog = result.log
            return result
        },

        /**
         * Check if a derivation's outputs already exist (without building).
         */
        async isCached(drv) {
            const { hit } = await checkCacheHit(drv)
            return hit
        },

        /** The log output from the last build() call. */
        get lastBuildLog() {
            return lastBuildLog
        },

        /** Clean up. Currently a no-op but reserved for future use. */
        async close() {
            // nothing to clean up yet
        },
    }
}
