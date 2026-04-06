// repl_session.js — convenience wrapper around main/internal_repl.js
// for build-capable tests.
//
// Usage:
//   import { withSession } from "../shared_tooling/index.js"
//   await withSession(async (sess) => {
//       const drv = await sess.eval(`derivation { ... }`)
//       const { outputPaths } = await sess.build(drv)
//   })

const internalReplPath = new URL("../../../../main/internal_repl.js", import.meta.url).pathname

/**
 * Open an internal-denix-repl session backed by a temporary store,
 * yield to fn, then close + clean up.
 *
 * @param {Function} fn — async (sess) => ...
 * @param {object} [opts]
 * @param {string} [opts.storeRoot] — use a specific store root instead of temp
 */
export async function withSession(fn, opts = {}) {
    const { createInternalRepl } = await import(internalReplPath)

    const storeRoot = opts.storeRoot || await Deno.makeTempDir({ prefix: "denix-test-store-" })
    const sess = await createInternalRepl({ storeRoot })

    try {
        return await fn(sess)
    } finally {
        await sess.close()
        // Clean up temp store if we created it
        if (!opts.storeRoot) {
            try {
                await Deno.remove(storeRoot, { recursive: true })
            } catch { /* ignore */ }
        }
    }
}
