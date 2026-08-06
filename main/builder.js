/**
 * Builder module — realizes derivations.
 *
 * Realization strategy per derivation (mirrors real Nix):
 *   1. cache hit — outputs already materialized in the denix store
 *   2. substitution — fetch prebuilt outputs (and their runtime closure)
 *      from a binary cache (cache.nixos.org), pure JS
 *   3. builtin:fetchurl — native JS implementation (fixed-output)
 *   4. local build — realize inputs first, then execute the builder
 *
 * denix can't write /nix/store, so store paths are computed as real Nix
 * paths (drv fidelity) but materialized under DENIX_STORE_ROOT
 * (default ~/.cache/denix/store), reachable through the same-length
 * RELOC_PREFIX symlink (see substituter.js) so embedded paths keep working.
 */

import { ensureStoreDirectory, STORE_DIR } from "./store_manager.js"
import { sha256Hex } from "../tools/hashing.js"
import { normalizeHashToHex, encodeBase32 } from "../tools/store_path.js"
import { hashPathSync } from "./nar_hash.js"
import { substituteClosure, ensureRelocRoot, RELOC_PREFIX, unpackNAR } from "./substituter.js"
import { sourcePathOrigins } from "./runtime.js"

/**
 * Get the effective store root directory.
 * Honors DENIX_STORE_ROOT env var, falls back to STORE_DIR from store_manager.
 */
export function getStoreRoot() {
    return Deno.env.get("DENIX_STORE_ROOT") || STORE_DIR
}

/**
 * Rewrite /nix/store references to the same-length relocation prefix, which
 * links into the denix store. Length-preserving, so offsets inside any
 * derived data stay valid.
 */
function localizeStorePaths(str) {
    return String(str).replaceAll("/nix/store", RELOC_PREFIX)
}

/** Same as builtins.placeholder: "/" + base32(sha256("nix-output:<name>")). */
function hashPlaceholder(outputName) {
    const digest = sha256Hex(`nix-output:${outputName}`)
    return "/" + encodeBase32(new Uint8Array(digest.match(/.{2}/g).map((b) => parseInt(b, 16))))
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
        // drv[outputName] is an output-object (with its own .outPath); the
        // base drv also has .outPath for the default output.
        const outObj = drv[outputName]
        const nixPath = (outObj && typeof outObj === "object" ? outObj.outPath : outObj) || drv.outPath
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

/** Copy a file/dir/symlink tree (preserving symlinks and exec bits). */
function copyTreeSync(src, dest) {
    const info = Deno.lstatSync(src)
    if (info.isSymlink) {
        Deno.symlinkSync(Deno.readLinkSync(src), dest)
    } else if (info.isDirectory) {
        Deno.mkdirSync(dest, { recursive: true })
        for (const entry of Deno.readDirSync(src)) {
            copyTreeSync(`${src}/${entry.name}`, `${dest}/${entry.name}`)
        }
    } else {
        Deno.copyFileSync(src, dest)
        if (info.mode & 0o111) {
            Deno.chmodSync(dest, info.mode & 0o777)
        }
    }
}

/**
 * Make sure an input source path (/nix/store/<base>) is materialized in the
 * denix store: copy it from its recorded filesystem origin, or fall back to
 * the binary cache (nixpkgs source files are usually there).
 */
async function materializeInputSrc(nixPath, { storeRoot, cacheUrl, verbose }) {
    const base = nixPath.split("/").pop()
    const localPath = `${storeRoot}/${base}`
    try {
        Deno.lstatSync(localPath)
        return localPath
    } catch { /* not yet */ }
    const origin = sourcePathOrigins.get(nixPath)
    if (origin) {
        const tempPath = `${storeRoot}/.tmp-${base}-${crypto.randomUUID().slice(0, 8)}`
        copyTreeSync(origin, tempPath)
        Deno.renameSync(tempPath, localPath)
        return localPath
    }
    const substituted = await substituteClosure(nixPath, { storeRoot, cacheUrl, verbose })
    if (substituted === null) {
        throw new Error(`input source ${nixPath} has no recorded origin and is not in the binary cache`)
    }
    return substituted
}

async function hashBytes(algo, bytes) {
    if (algo === "sha256") { return sha256Hex(bytes) }
    const subtle = { sha1: "SHA-1", sha512: "SHA-512" }[algo]
    if (!subtle) {
        throw new Error(`unsupported hash algorithm '${algo}'`)
    }
    const digest = new Uint8Array(await crypto.subtle.digest(subtle, bytes))
    return [...digest].map((b) => b.toString(16).padStart(2, "0")).join("")
}

/** Native builtin:fetchurl — download, verify fixed-output hash, materialize. */
async function buildFetchurl(drv, outputPaths, { verbose }) {
    const env = drv.drvEnv || {}
    const url = String(env.url)
    const executable = env.executable === "1"
    const unpack = env.unpack === "1"
    if (verbose) {
        console.error(`fetching ${url}`)
    }
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`builtin:fetchurl: HTTP ${response.status} for ${url}`)
    }
    const bytes = new Uint8Array(await response.arrayBuffer())
    const outPath = outputPaths.out
    const tempPath = `${outPath}.tmp-${crypto.randomUUID().slice(0, 8)}`
    try {
        if (unpack) {
            // unpack=true means the URL is a NAR archive
            unpackNAR(bytes, tempPath)
        } else {
            Deno.writeFileSync(tempPath, bytes)
            if (executable) {
                Deno.chmodSync(tempPath, 0o755)
            }
        }
        if (drv.fixedOutputInfo) {
            const { algo, hex, recursive } = drv.fixedOutputInfo
            const actual = recursive
                ? normalizeHashToHex(hashPathSync(tempPath), algo).hex
                : await hashBytes(algo, bytes)
            if (actual !== hex) {
                throw new Error(
                    `hash mismatch in file downloaded from ${url}:\n` +
                    `  specified: ${algo}:${hex}\n` +
                    `  got:       ${algo}:${actual}`
                )
            }
        }
        Deno.renameSync(tempPath, outPath)
    } catch (error) {
        try { Deno.removeSync(tempPath, { recursive: true }) } catch { /* ignore */ }
        throw error
    }
    return { outputPaths, cached: false, log: `fetched ${url}` }
}

/**
 * Build (realize) a derivation.
 *
 * @param {object} drv — derivation object from runtime.js
 * @param {object} opts
 * @param {string} [opts.storeRoot] — override store root
 * @param {boolean} [opts.verbose] — print build log
 * @param {boolean} [opts.substituteTarget] — allow substituting the root
 *     derivation itself (deps always may substitute). Default false: the
 *     target is built locally, like nix-build does for a changed package.
 * @param {string} [opts.cacheUrl] — binary cache URL
 * @returns {Promise<{outputPaths: Record<string, string>, cached: boolean, log: string}>}
 */
export async function build(drv, opts = {}) {
    const storeRoot = opts.storeRoot || getStoreRoot()
    await Deno.mkdir(storeRoot, { recursive: true })
    ensureRelocRoot(storeRoot)

    // Shared across the whole build graph so diamond dependencies are realized
    // once. Keyed by drvPath (falling back to outPath).
    const built = opts._built || new Map()
    const isRoot = !opts._built

    // 1. cache hit
    const { hit, outputPaths } = await checkCacheHit(drv)
    if (hit) {
        return { outputPaths, cached: true, log: "" }
    }

    // 2. substitution (skipped for the root target unless substituteTarget)
    if (!isRoot || opts.substituteTarget) {
        let allSubstituted = true
        for (const [outputName, localPath] of Object.entries(outputPaths)) {
            const base = localPath.split("/").pop()
            const result = await substituteClosure(`/nix/store/${base}`, {
                storeRoot,
                cacheUrl: opts.cacheUrl,
                verbose: opts.verbose,
            })
            if (result === null) {
                allSubstituted = false
                break
            }
        }
        if (allSubstituted) {
            return { outputPaths, cached: false, log: "substituted" }
        }
    }

    // 3. native fetchurl
    if (drv.builder === "builtin:fetchurl") {
        return await buildFetchurl(drv, outputPaths, { verbose: opts.verbose })
    }

    // 4. local build — realize dependencies first (depth-first ⇒ topological)
    for (const { drv: dep } of (drv.inputDrvObjects || [])) {
        const key = dep.drvPath || dep.outPath
        if (built.has(key)) { continue }
        const depResult = await build(dep, { ...opts, storeRoot, _built: built })
        built.set(key, depResult)
    }

    // materialize input sources (setup.sh, patches, package sources, …)
    for (const src of (drv.inputSrcs || [])) {
        await materializeInputSrc(src, { storeRoot, cacheUrl: opts.cacheUrl, verbose: opts.verbose })
    }

    // Like real Nix's inputRewrites: builtins.placeholder output strings in
    // env/args become the actual (relocated) output paths at build time.
    const placeholderRewrites = Object.entries(outputPaths).map(([outputName, localPath]) => [
        hashPlaceholder(outputName),
        `${RELOC_PREFIX}/${localPath.split("/").pop()}`,
    ])
    const rewriteValue = (value) => {
        let str = localizeStorePaths(value)
        for (const [placeholder, path] of placeholderRewrites) {
            str = str.replaceAll(placeholder, path)
        }
        return str
    }

    // Build environment: the exact serialized drv env, relocated.
    const env = {}
    for (const [key, value] of Object.entries(drv.drvEnv || {})) {
        env[key] = rewriteValue(value)
    }
    if ("__json" in env) {
        throw new Error(
            `local builds of __structuredAttrs derivations aren't supported yet ('${drv.name}'); ` +
            `it should normally be substituted from the binary cache`
        )
    }

    env.NIX_BUILD_TOP = await Deno.makeTempDir({ prefix: "denix-build-" })
    env.TMPDIR = env.NIX_BUILD_TOP
    env.TEMP = env.NIX_BUILD_TOP
    env.TEMPDIR = env.NIX_BUILD_TOP
    env.TMP = env.NIX_BUILD_TOP
    env.HOME = "/homeless-shelter"
    env.NIX_STORE = RELOC_PREFIX
    env.NIX_BUILD_CORES = String(navigator?.hardwareConcurrency || 4)
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

    // Output env vars point into the relocated store (drv env already has
    // them, but make sure they exist even for drvs that dropped `outputs`).
    for (const [outputName, localPath] of Object.entries(outputPaths)) {
        env[outputName] = `${RELOC_PREFIX}/${localPath.split("/").pop()}`
    }

    const builderExe = rewriteValue(drv.builder)
    const args = (drv.args || []).map(rewriteValue)
    let log = ""

    try {
        // Do NOT pre-create output paths. Real Nix leaves $out for the
        // builder to create — it may be a file (echo > $out) or a directory
        // (mkdir $out).
        if (opts.verbose) {
            console.error(`building ${drv.name}`)
        }

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
            log = "" // already shown; don't duplicate it in error messages
        }

        // Builders write to $out = RELOC_PREFIX/<base>, which resolves into
        // storeRoot/<base>; outputPaths already point there for callers.
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
            const actual = recursive
                ? normalizeHashToHex(hashPathSync(outPath), algo).hex
                : await hashBytes(algo, await Deno.readFile(outPath))
            if (actual !== hex) {
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
