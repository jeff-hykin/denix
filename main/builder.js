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
import { sha256Hex } from "../tools/hashing.js"
import { normalizeHashToHex } from "../tools/store_path.js"
import { hashDirectory } from "./nar_hash.js"

/**
 * Get the effective store root directory.
 * Honors DENIX_STORE_ROOT env var, falls back to STORE_DIR from store_manager.
 */
export function getStoreRoot() {
    return Deno.env.get("DENIX_STORE_ROOT") || STORE_DIR
}

/**
 * Rewrite every absolute /nix/store/<base> reference in a string to point at
 * the relocatable store root. denix can't write to /nix/store (needs root), so
 * derivation output paths are computed as real Nix paths for hashing fidelity
 * but materialized under storeRoot; builders must see the materialized paths.
 */
function localizeStorePaths(str, storeRoot) {
    const prefix = storeRoot.endsWith("/") ? storeRoot : storeRoot + "/"
    return String(str).replaceAll("/nix/store/", prefix)
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
        // drv[outputName] is now an output-object (with its own .outPath); the
        // base drv also has .outPath for the default output.
        const outObj = drv[outputName]
        const nixPath = (outObj && typeof outObj === "object" ? outObj.outPath : outObj) || drv.outPath
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

    // Shared across the whole build graph so diamond dependencies are realized
    // once. Keyed by drvPath (falling back to outPath).
    const built = opts._built || new Map()

    // --------------------------------------------------------------
    // realize dependencies first (depth-first => topological order)
    // inputDrvObjects entries are { drv, outputName }; realize each unique
    // derivation once (building it materializes all of its outputs).
    // --------------------------------------------------------------
    for (const { drv: dep } of (drv.inputDrvObjects || [])) {
        const key = dep.drvPath || dep.outPath
        if (built.has(key)) continue
        const depResult = await build(dep, { ...opts, storeRoot, _built: built })
        built.set(key, depResult)
    }

    // Check cache (after deps so their outputs exist for reference rewriting)
    const { hit, outputPaths } = await checkCacheHit(drv)
    if (hit) {
        return { outputPaths, cached: true, log: "" }
    }

    // Prepare build environment. The derivation's env values already contain
    // computed /nix/store/<base> paths (its own outputs and any dependency
    // outputs embedded in strings); rewrite them to the relocatable store.
    const env = {}

    // Copy derivation's env vars
    if (drv.drvAttrs) {
        for (const [key, value] of Object.entries(drv.drvAttrs)) {
            if (typeof value === "string") {
                env[key] = localizeStorePaths(value, storeRoot)
            } else if (typeof value === "number" || typeof value === "bigint") {
                env[key] = String(value)
            } else if (value === true) {
                env[key] = "1"
            } else if (value === false || value === null) {
                env[key] = ""
            } else if (value?.type === "derivation") {
                env[key] = localizeStorePaths(value.outPath, storeRoot)
            } else if (Array.isArray(value)) {
                env[key] = value
                    .map((v) => (v?.type === "derivation" ? v.outPath : String(v?.toString?.() ?? v)))
                    .map((s) => localizeStorePaths(s, storeRoot))
                    .join(" ")
            } else if (value && typeof value.toString === "function") {
                // Path / InterpolatedString and similar coerce via toString.
                env[key] = localizeStorePaths(value.toString(), storeRoot)
            }
        }
    }

    // Set standard derivation env vars
    env.name = drv.name
    env.builder = localizeStorePaths(drv.builder, storeRoot)
    env.system = drv.system
    env.NIX_BUILD_TOP = await Deno.makeTempDir({ prefix: "denix-build-" })
    env.TMPDIR = env.NIX_BUILD_TOP
    env.TEMP = env.NIX_BUILD_TOP
    env.TEMPDIR = env.NIX_BUILD_TOP
    env.TMP = env.NIX_BUILD_TOP
    env.HOME = "/homeless-shelter"
    // PATH: real Nix gives the builder NO host PATH — tools come from the
    // derivation's dependencies (stdenv builds PATH from buildInputs). We honor
    // a PATH the derivation set; otherwise default to Nix's "/path-not-set"
    // sentinel so host /usr/bin does NOT leak in. Set DENIX_IMPURE_HOST_PATH=1
    // to opt into the host PATH for quick host-tool builds.
    if (!("PATH" in env) || env.PATH === "" || env.PATH == null) {
        env.PATH = Deno.env.get("DENIX_IMPURE_HOST_PATH") === "1"
            ? (Deno.env.get("PATH") || "/usr/bin:/bin:/usr/sbin:/sbin")
            : "/path-not-set"
    }

    // Map output paths to relocatable store
    for (const outputName of (drv.outputs || ["out"])) {
        const localPath = outputPaths[outputName]
        env[outputName] = localPath
    }

    // Execute builder. Both the builder path and its args may reference
    // /nix/store; rewrite them to the relocatable store.
    const builderExe = localizeStorePaths(drv.builder, storeRoot)
    const args = (drv.args || []).map((a) => localizeStorePaths(a, storeRoot))
    let log = ""

    try {
        // Do NOT pre-create output paths. Real Nix leaves $out for the
        // builder to create — it may be a file (echo > $out) or a directory
        // (mkdir $out). We only guarantee the store root exists (done above).

        const proc = new Deno.Command(builderExe, {
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

        // Verify the builder actually produced each declared output.
        for (const [outputName, p] of Object.entries(outputPaths)) {
            try {
                await Deno.stat(p)
            } catch {
                throw new Error(
                    `builder '${drv.builder}' for '${drv.name}' did not produce output '${outputName}' at ${p}\n${log}`
                )
            }
        }

        // For fixed-output derivations, verify the produced content matches the
        // declared hash (flat = hash of the file bytes; recursive = NAR hash of
        // the output tree). A mismatch is a hard error, exactly like Nix.
        if (drv.fixedOutputInfo) {
            const outPath = outputPaths.out
            const { algo, hex, recursive } = drv.fixedOutputInfo
            let actual
            if (recursive) {
                // hashDirectory may return SRI ("sha256-…") or "sha256:hex"
                // depending on whether the `nix` CLI was used; normalize to hex.
                const raw = await hashDirectory(outPath)
                actual = normalizeHashToHex(raw, "sha256").hex
            } else if (algo === "sha256") {
                actual = sha256Hex(await Deno.readFile(outPath))
            } else {
                actual = null // unsupported flat algo — skip rather than false-pass
            }
            if (actual !== null && actual !== hex) {
                for (const pp of Object.values(outputPaths)) {
                    try { await Deno.remove(pp, { recursive: true }) } catch { /* ignore */ }
                }
                throw new Error(
                    `hash mismatch in fixed-output derivation '${drv.name}':\n` +
                    `  specified: ${algo}:${hex}\n` +
                    `  got:       ${algo}:${actual}`
                )
            }
        }

        return { outputPaths, cached: false, log }
    } finally {
        // Clean up build directory
        try { await Deno.remove(env.NIX_BUILD_TOP, { recursive: true }) } catch { /* ignore */ }
    }
}
