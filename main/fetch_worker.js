// Subprocess worker for builtins.fetchurl / builtins.fetchTarball.
// Nix evaluation is synchronous, so the runtime can't await downloads
// mid-expression (e.g. `import (builtins.fetchTarball ...)`); instead it
// spawns this script with outputSync. Payload comes in as JSON argv[0]:
//   { kind: "fetchurl"|"fetchTarball", url, sha256?, name, cacheKey }
// and the result goes to stdout as JSON: { storePath } or { error }.
import { downloadWithRetry } from "./fetcher.js"
import { extractTarball } from "./tar.js"
import { hashDirectory } from "./nar_hash.js"
import { ensureStoreDirectory, computeFetchStorePath, setCachedPath, atomicMove } from "./store_manager.js"
import { sha256Hex } from "../tools/hashing.js"

const fetchurl = async ({ url, sha256, name, cacheKey }) => {
    await ensureStoreDirectory()
    const tempFile = `${await Deno.makeTempDir()}/download`
    await downloadWithRetry(url, tempFile)

    const fileBytes = await Deno.readFile(tempFile)
    if (sha256) {
        const actualHash = sha256Hex(fileBytes)
        const normalizedExpected = sha256.replace(/^sha256[:-]/, "")
        if (actualHash !== normalizedExpected) {
            try { await Deno.remove(tempFile) } catch {}
            throw new Error(
                `Hash mismatch for ${url}:\n` +
                `  Expected: ${normalizedExpected}\n` +
                `  Actual:   ${actualHash}`
            )
        }
    }
    const fileHash = "sha256:" + sha256Hex(fileBytes)

    // builtins.fetchurl produces a FLAT file store path (real Nix stores the
    // downloaded file itself, not a wrapping directory)
    const storePath = computeFetchStorePath(fileHash, name, { recursive: false })
    await atomicMove(tempFile, storePath)
    await setCachedPath(cacheKey, storePath)
    return storePath
}

const fetchTarball = async ({ url, sha256, name, cacheKey }) => {
    await ensureStoreDirectory()
    const tempTar = `${await Deno.makeTempDir()}/download.tar.gz`
    await downloadWithRetry(url, tempTar)

    const tempExtract = `${await Deno.makeTempDir()}/extracted`
    await extractTarball(tempTar, tempExtract)
    try { await Deno.remove(tempTar) } catch {}

    // sha256 is validated against the NAR hash of the extracted tree, like
    // real Nix — not the raw tarball bytes
    const narHash = await hashDirectory(tempExtract)
    if (sha256) {
        const normalizedExpected = sha256.replace(/^sha256[:-]/, "")
        const normalizedActual = narHash.replace(/^sha256[:-]/, "")
        if (normalizedActual !== normalizedExpected) {
            throw new Error(
                `Hash mismatch for ${url}:\n` +
                `  Expected: ${normalizedExpected}\n` +
                `  Actual:   ${normalizedActual}`
            )
        }
    }

    const storePath = computeFetchStorePath(narHash, name)
    await atomicMove(tempExtract, storePath)
    await setCachedPath(cacheKey, storePath)
    return storePath
}

try {
    const payload = JSON.parse(Deno.args[0])
    const storePath = payload.kind === "fetchurl" ? await fetchurl(payload) : await fetchTarball(payload)
    console.log(JSON.stringify({ storePath }))
} catch (error) {
    console.log(JSON.stringify({ error: error?.message || String(error) }))
    Deno.exit(1)
}
