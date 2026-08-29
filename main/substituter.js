/**
 * Binary-cache substituter — pure JS implementation of Nix's substitution.
 *
 * Downloads .narinfo metadata and NAR archives from a binary cache
 * (default https://cache.nixos.org), decompresses (xz or zstd), verifies
 * the NAR hash, and unpacks into the relocatable denix store.
 */

import { normalizeHashToHex } from "../tools/store_path.js"
import { sha256Hex } from "../tools/hashing.js"
import { isMachO, resignMachO } from "./macho_sign.js"

const DEFAULT_CACHE = "https://cache.nixos.org"

// denix can't write /nix/store (root-owned). Store contents embed absolute
// /nix/store paths (shebangs, dylib install names), so paths are rewritten to
// a SAME-LENGTH prefix — byte-length-preserving edits keep binaries valid —
// which is a symlink into the persistent denix store. Modified Mach-O files
// are re-signed (ad-hoc) since arm64 macOS kills binaries whose signature
// doesn't match their content.
export const RELOC_PREFIX = "/tmp/dnixs" // must stay exactly 10 bytes, like "/nix/store"

/** Create/verify the RELOC_PREFIX symlink pointing at storeRoot. */
export function ensureRelocRoot(storeRoot) {
    let info
    try {
        info = Deno.lstatSync(RELOC_PREFIX)
    } catch {
        Deno.mkdirSync(storeRoot, { recursive: true })
        Deno.symlinkSync(storeRoot, RELOC_PREFIX)
        return
    }
    // /tmp is world-writable: refuse a link we don't own (symlink attack)
    if (info.uid !== undefined && Deno.uid() !== null && info.uid !== Deno.uid()) {
        throw new Error(`${RELOC_PREFIX} exists but is owned by uid ${info.uid}; refusing to use it`)
    }
    if (!info.isSymlink || Deno.readLinkSync(RELOC_PREFIX) !== storeRoot) {
        Deno.removeSync(RELOC_PREFIX, { recursive: true })
        Deno.mkdirSync(storeRoot, { recursive: true })
        Deno.symlinkSync(storeRoot, RELOC_PREFIX)
    }
}

let xzStreamPromise = null
function getXzReadableStream() {
    xzStreamPromise ||= import("npm:xz-decompress@0.2.2").then((m) => (m.default || m).XzReadableStream)
    return xzStreamPromise
}
let zstdPromise = null
function getZstdDecompress() {
    zstdPromise ||= import("npm:fzstd@0.1.1").then((m) => (m.default || m).decompress || m.decompress)
    return zstdPromise
}

export function parseNarinfo(text) {
    const info = {}
    for (const line of text.split("\n")) {
        const idx = line.indexOf(": ")
        if (idx === -1) { continue }
        const key = line.slice(0, idx)
        const value = line.slice(idx + 2)
        if (key === "References") {
            info[key] = value ? value.split(" ") : []
        } else {
            info[key] = value
        }
    }
    return info
}

/** @param {string} storePath full /nix/store path or bare basename */
export async function fetchNarinfo(storePath, cacheUrl = DEFAULT_CACHE) {
    const base = storePath.split("/").pop()
    const hash = base.split("-")[0]
    const response = await fetch(`${cacheUrl}/${hash}.narinfo`)
    if (!response.ok) {
        await response.body?.cancel()
        return null
    }
    return parseNarinfo(await response.text())
}

/** Download + decompress the NAR described by a narinfo. Verifies NarHash. */
export async function fetchNar(narinfo, cacheUrl = DEFAULT_CACHE) {
    const response = await fetch(`${cacheUrl}/${narinfo.URL}`)
    if (!response.ok) {
        throw new Error(`substituter: failed to fetch ${narinfo.URL}: HTTP ${response.status}`)
    }
    let bytes
    const compression = narinfo.Compression || "xz"
    if (compression === "xz") {
        const XzReadableStream = await getXzReadableStream()
        bytes = new Uint8Array(await new Response(new XzReadableStream(response.body)).arrayBuffer())
    } else if (compression === "zstd") {
        const decompress = await getZstdDecompress()
        bytes = decompress(new Uint8Array(await response.arrayBuffer()))
    } else if (compression === "none") {
        bytes = new Uint8Array(await response.arrayBuffer())
    } else {
        throw new Error(`substituter: unsupported NAR compression '${compression}'`)
    }
    const expected = normalizeHashToHex(narinfo.NarHash, "sha256").hex
    const actual = sha256Hex(bytes)
    if (actual !== expected) {
        throw new Error(`substituter: NAR hash mismatch for ${narinfo.StorePath}: expected ${expected}, got ${actual}`)
    }
    return bytes
}

// ---------------------------------------------------------------------------
// NAR unpacking (inverse of main/nar_hash.js serialization)
// ---------------------------------------------------------------------------

class NarReader {
    constructor(bytes) {
        this.bytes = bytes
        this.pos = 0
        this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
        this.decoder = new TextDecoder()
    }
    readData() {
        const len = Number(this.view.getBigUint64(this.pos, true))
        this.pos += 8
        const data = this.bytes.subarray(this.pos, this.pos + len)
        this.pos += len + ((8 - (len % 8)) % 8)
        return data
    }
    readString() {
        return this.decoder.decode(this.readData())
    }
    expect(str) {
        const got = this.readString()
        if (got !== str) {
            throw new Error(`NAR parse error at ${this.pos}: expected "${str}", got "${got}"`)
        }
    }
}

/** Unpack NAR bytes to destPath (file, dir, or symlink). */
export function unpackNAR(bytes, destPath) {
    const reader = new NarReader(bytes)
    reader.expect("nix-archive-1")
    unpackNode(reader, destPath)
}

function unpackNode(reader, path) {
    reader.expect("(")
    reader.expect("type")
    const type = reader.readString()
    if (type === "regular") {
        let executable = false
        let tag = reader.readString()
        if (tag === "executable") {
            executable = true
            reader.readString() // empty payload
            tag = reader.readString()
        }
        if (tag !== "contents") {
            throw new Error(`NAR parse error: expected "contents", got "${tag}"`)
        }
        const data = reader.readData()
        Deno.writeFileSync(path, data)
        if (executable) {
            Deno.chmodSync(path, 0o755)
        }
        reader.expect(")")
    } else if (type === "symlink") {
        reader.expect("target")
        const target = reader.readString()
        Deno.symlinkSync(target, path)
        reader.expect(")")
    } else if (type === "directory") {
        Deno.mkdirSync(path, { recursive: true })
        while (true) {
            const tag = reader.readString()
            if (tag === ")") { break }
            if (tag !== "entry") {
                throw new Error(`NAR parse error: expected "entry" or ")", got "${tag}"`)
            }
            reader.expect("(")
            reader.expect("name")
            const name = reader.readString()
            reader.expect("node")
            unpackNode(reader, `${path}/${name}`)
            reader.expect(")")
        }
    } else {
        throw new Error(`NAR parse error: unknown node type "${type}"`)
    }
}

// ---------------------------------------------------------------------------
// Path relocation
// ---------------------------------------------------------------------------

const NIX_PREFIX_BYTES = new TextEncoder().encode("/nix/store")
const RELOC_PREFIX_BYTES = new TextEncoder().encode(RELOC_PREFIX)

function findPattern(haystack, needle, from) {
    outer: for (let i = from; i <= haystack.length - needle.length; i++) {
        if (haystack[i] !== needle[0]) { continue }
        for (let j = 1; j < needle.length; j++) {
            if (haystack[i + j] !== needle[j]) { continue outer }
        }
        return i
    }
    return -1
}

/** Rewrite /nix/store → RELOC_PREFIX in every file/symlink under path. */
export function relocateTree(path) {
    const info = Deno.lstatSync(path)
    if (info.isSymlink) {
        const target = Deno.readLinkSync(path)
        if (target.includes("/nix/store")) {
            Deno.removeSync(path)
            Deno.symlinkSync(target.replaceAll("/nix/store", RELOC_PREFIX), path)
        }
        return
    }
    if (info.isDirectory) {
        for (const entry of Deno.readDirSync(path)) {
            relocateTree(`${path}/${entry.name}`)
        }
        return
    }
    const bytes = Deno.readFileSync(path)
    let i = findPattern(bytes, NIX_PREFIX_BYTES, 0)
    if (i === -1) { return }
    const machO = isMachO(bytes)
    while (i !== -1) {
        bytes.set(RELOC_PREFIX_BYTES, i)
        i = findPattern(bytes, NIX_PREFIX_BYTES, i + RELOC_PREFIX_BYTES.length)
    }
    if (machO) {
        // content changed → the embedded signature is stale; arm64 macOS SIGKILLs
        try {
            resignMachO(bytes)
        } catch (error) {
            throw new Error(`could not re-sign Mach-O ${path}: ${error.message}`)
        }
    }
    const mode = info.mode & 0o777
    Deno.writeFileSync(path, bytes)
    if (mode) { Deno.chmodSync(path, mode) }
}

/**
 * Try to substitute a store path from the binary cache.
 * Materializes at <storeRoot>/<basename>. Returns the local path, or null if
 * the cache doesn't have it.
 */
export async function substitute(storePath, { storeRoot, cacheUrl = DEFAULT_CACHE, verbose = false, narinfo = null } = {}) {
    const base = storePath.split("/").pop()
    const localPath = `${storeRoot}/${base}`
    try {
        Deno.lstatSync(localPath)
        return localPath // already materialized
    } catch { /* not yet */ }

    narinfo ||= await fetchNarinfo(base, cacheUrl)
    if (!narinfo) { return null }
    if (verbose) {
        console.error(`substituting ${base} (${narinfo.FileSize} bytes compressed)`)
    }
    const nar = await fetchNar(narinfo, cacheUrl)
    const tempPath = `${storeRoot}/.tmp-${base}-${crypto.randomUUID().slice(0, 8)}`
    try {
        unpackNAR(nar, tempPath)
        relocateTree(tempPath)
        Deno.renameSync(tempPath, localPath)
    } catch (error) {
        try { Deno.removeSync(tempPath, { recursive: true }) } catch { /* ignore */ }
        throw error
    }
    return { localPath, references: narinfo.References || [] }
}

/**
 * Substitute a store path AND its full runtime closure (narinfo References).
 * Returns the local path, or null if the cache is missing the root path.
 * Missing references are a hard error (closure would be broken).
 */
export async function substituteClosure(storePath, opts) {
    const base = storePath.split("/").pop()
    const localPath = `${opts.storeRoot}/${base}`
    const done = opts.done || (opts = { ...opts, done: new Set() }).done
    if (done.has(base)) { return localPath }
    done.add(base)
    try {
        Deno.lstatSync(localPath)
        return localPath // present ⇒ its closure was completed before it landed
    } catch { /* not yet */ }
    const narinfo = await fetchNarinfo(base, opts.cacheUrl)
    if (!narinfo) { return null }
    // materialize references FIRST so the root's presence implies completeness
    for (const ref of narinfo.References || []) {
        if (ref === base) { continue } // self-reference
        const refResult = await substituteClosure(`/nix/store/${ref}`, opts)
        if (refResult === null) {
            throw new Error(`substituter: closure of ${base} is incomplete — ${ref} not in cache`)
        }
    }
    const result = await substitute(storePath, { ...opts, narinfo })
    return typeof result === "string" ? result : result.localPath
}
