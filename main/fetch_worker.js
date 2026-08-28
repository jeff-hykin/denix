// Web Worker for builtins.fetchurl / builtins.fetchTarball / registry lookups.
// Nix evaluation is synchronous, so the runtime can't await downloads
// mid-expression (e.g. `import (builtins.fetchTarball ...)`); it blocks while
// this worker thread does the async work (see sync_fetch). Payloads:
//   { kind: "fetchurl"|"fetchTarball", url, sha256?, name, cacheKey }
//   { kind: "fetchText", url }
import { serveSync } from "https://raw.esm.sh/gh/jeff-hykin/sync_fetch@v1.0.0/worker.js"
import { downloadWithRetry } from "./fetcher.js"
import { extractTarball } from "./tar.js"
import { hashDirectory } from "./nar_hash.js"
import { ensureStoreDirectory, computeFetchStorePath, setCachedPath, setCachedMeta, atomicMove } from "./store_manager.js"
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
    const { lastModified } = await extractTarball(tempTar, tempExtract)
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
    await setCachedMeta(cacheKey, { narHash, lastModified })
    return { storePath, narHash, lastModified }
}

const fetchText = async ({ url }) => {
    const response = await fetch(url, { headers: { "User-Agent": "Denix/1.0" } })
    if (!response.ok) {
        throw new Error(`fetching ${url} gave HTTP ${response.status}`)
    }
    return await response.text()
}

serveSync(async (payload) => {
    if (payload.kind === "fetchText") {
        return { text: await fetchText(payload) }
    }
    if (payload.kind === "fetchurl") {
        return { storePath: await fetchurl(payload) }
    }
    return await fetchTarball(payload)
})
