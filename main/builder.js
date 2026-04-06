/**
 * Builder module — executes derivation builders and manages outputs.
 *
 * This is a skeleton implementation that handles the simplest cases:
 * a derivation with builder=/bin/sh (or similar), args=["-c", script],
 * and environment variables. It writes outputs to a relocatable store
 * directory (controlled by DENIX_STORE_ROOT or default ~/.cache/denix/store).
 *
 * Cache-hit detection: if the output path already exists on disk, the
 * builder is not re-executed.
 */

import { ensureStoreDirectory, STORE_DIR } from "./store_manager.js"
import { serializeDerivation } from "../tools/store_path.js"

/**
 * Get the effective store root directory.
 * Honors DENIX_STORE_ROOT env var, falls back to STORE_DIR from store_manager.
 */
export function getStoreRoot() {
    return Deno.env.get("DENIX_STORE_ROOT") || STORE_DIR
}

/**
 * Check if a derivation's outputs already exist (cache hit).
 * @param {object} drv — derivation object from runtime.js
 * @returns {Promise<{hit: boolean, outputPaths: Record<string, string>}>}
 */
export async function checkCacheHit(drv) {
    const storeRoot = getStoreRoot()
    const outputPaths = {}
    let allExist = true

    for (const outputName of (drv.outputs || ["out"])) {
        const nixPath = drv[outputName] || drv.outPath
        // The nix store path is /nix/store/<hash>-<name>
        // In our relocatable store, it becomes <storeRoot>/<hash>-<name>
        const basename = nixPath.split("/").pop()
        const localPath = `${storeRoot}/${basename}`
        outputPaths[outputName] = localPath

        try {
            await Deno.stat(localPath)
        } catch {
            allExist = false
        }
    }

    return { hit: allExist, outputPaths }
}

/**
 * Build (realize) a derivation.
 *
 * @param {object} drv — derivation object from runtime.js
 * @param {object} opts
 * @param {string} [opts.storeRoot] — override store root
 * @param {boolean} [opts.verbose] — print build log
 * @returns {Promise<{outputPaths: Record<string, string>, cached: boolean, log: string}>}
 */
export async function build(drv, opts = {}) {
    const storeRoot = opts.storeRoot || getStoreRoot()
    await Deno.mkdir(storeRoot, { recursive: true })

    // Check cache first
    const { hit, outputPaths } = await checkCacheHit(drv)
    if (hit) {
        return { outputPaths, cached: true, log: "" }
    }

    // Prepare build environment
    const env = {}

    // Copy derivation's env vars
    if (drv.drvAttrs) {
        for (const [key, value] of Object.entries(drv.drvAttrs)) {
            if (typeof value === "string") {
                env[key] = value
            } else if (typeof value === "number" || typeof value === "bigint") {
                env[key] = String(value)
            } else if (value === true) {
                env[key] = "1"
            } else if (value === false || value === null) {
                env[key] = ""
            } else if (value?.type === "derivation") {
                env[key] = value.outPath
            }
        }
    }

    // Set standard derivation env vars
    env.name = drv.name
    env.builder = drv.builder
    env.system = drv.system
    env.NIX_BUILD_TOP = await Deno.makeTempDir({ prefix: "denix-build-" })
    env.TMPDIR = env.NIX_BUILD_TOP
    env.TEMP = env.NIX_BUILD_TOP
    env.TEMPDIR = env.NIX_BUILD_TOP
    env.TMP = env.NIX_BUILD_TOP
    env.HOME = "/homeless-shelter"
    // Provide a working PATH so builders can find /bin/sh, coreutils, etc.
    // Real nix populates this from the derivation's dependencies; denix
    // provides a reasonable default from the host so simple builders work.
    env.PATH = Deno.env.get("PATH") || "/usr/bin:/bin:/usr/sbin:/sbin"

    // Map output paths to relocatable store
    for (const outputName of (drv.outputs || ["out"])) {
        const localPath = outputPaths[outputName]
        env[outputName] = localPath
    }

    // Execute builder
    const args = drv.args || []
    let log = ""

    try {
        // Create output directories
        for (const p of Object.values(outputPaths)) {
            await Deno.mkdir(p, { recursive: true })
        }

        const proc = new Deno.Command(drv.builder, {
            args,
            cwd: env.NIX_BUILD_TOP,
            env,
            clearEnv: true,
            stdout: "piped",
            stderr: "piped",
        })

        const result = await proc.output()
        const decoder = new TextDecoder()
        const stdout = decoder.decode(result.stdout)
        const stderr = decoder.decode(result.stderr)
        log = stdout + stderr

        if (opts.verbose) {
            if (stdout) console.log(stdout)
            if (stderr) console.error(stderr)
        }

        if (result.code !== 0) {
            // Clean up failed outputs
            for (const p of Object.values(outputPaths)) {
                try { await Deno.remove(p, { recursive: true }) } catch { /* ignore */ }
            }
            throw new Error(
                `builder '${drv.builder}' for '${drv.name}' failed with exit code ${result.code}\n${log}`
            )
        }

        return { outputPaths, cached: false, log }
    } finally {
        // Clean up build directory
        try { await Deno.remove(env.NIX_BUILD_TOP, { recursive: true }) } catch { /* ignore */ }
    }
}
