// Store path computation utilities for Nix derivations
// Based on: https://nix.dev/manual/nix/2.22/protocols/store-path

import { sha256Hex } from "./hashing.js"

// Nix's base-32 alphabet (note: no 'e', 'o', 't', 'u')
const NIX_BASE32_ALPHABET = "0123456789abcdfghijklmnpqrsvwxyz"

/**
 * Encode bytes to Nix base-32 format
 * Nix uses a custom base-32 encoding with reverse byte order
 * Based on: https://bernsteinbear.com/blog/nix-by-hand/
 */
export function encodeBase32(bytes) {
    // Nix base32 algorithm (see: https://github.com/kolloch/nix-base32)
    // Process 5-bit chunks in reverse order from total bit length

    const len = Math.floor((bytes.length * 8 - 1) / 5) + 1
    let result = ""

    for (let n = len - 1; n >= 0; n--) {
        const b = n * 5  // bit position
        const i = Math.floor(b / 8)  // byte index
        const j = b % 8  // bit offset within byte

        // Extract 5 bits spanning potentially two bytes
        const v1 = (bytes[i] >> j) & 0xff
        const v2 = (i + 1 < bytes.length) ? ((bytes[i + 1] << (8 - j)) & 0xff) : 0
        const v = (v1 | v2) & 0x1f  // combine and mask to 5 bits

        result += NIX_BASE32_ALPHABET[v]
    }

    return result
}

/**
 * Decode a Nix base-32 string back into bytes (inverse of encodeBase32).
 */
export function decodeBase32(str) {
    const len = Math.floor((str.length * 5) / 8)
    const bytes = new Uint8Array(len)
    for (let n = 0; n < str.length; n++) {
        const c = str[str.length - 1 - n]
        const digit = NIX_BASE32_ALPHABET.indexOf(c)
        if (digit < 0) throw new Error(`invalid Nix base-32 character: ${c}`)
        const b = n * 5
        const i = Math.floor(b / 8)
        const j = b % 8
        bytes[i] |= (digit << j) & 0xff
        if (i + 1 < len) bytes[i + 1] |= (digit >> (8 - j)) & 0xff
    }
    return bytes
}

const bytesToHex = (bytes) =>
    [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("")

/**
 * Normalize a Nix hash string into { algo, hex }. Accepts:
 *   - SRI:        "sha256-<base64>"
 *   - prefixed:   "sha256:<base16|base32|base64>"
 *   - bare:       "<base16|base32|base64>" (algo from algoHint)
 * The encoding of a bare/prefixed body is inferred from its length for the
 * given algorithm (sha256: 64 hex / 52 base32 / 44 base64).
 */
export function normalizeHashToHex(hashStr, algoHint) {
    let algo = algoHint
    let body = hashStr

    if (hashStr.includes("-")) {
        const i = hashStr.indexOf("-")
        algo = hashStr.slice(0, i)
        body = hashStr.slice(i + 1)
        return { algo, hex: bytesToHex(Uint8Array.from(atob(body), (c) => c.charCodeAt(0))) }
    }
    if (hashStr.includes(":")) {
        const i = hashStr.indexOf(":")
        algo = hashStr.slice(0, i)
        body = hashStr.slice(i + 1)
    }

    const expectedBytes = { md5: 16, sha1: 20, sha256: 32, sha512: 64 }[algo]
    const hexLen = expectedBytes * 2
    const base32Len = Math.ceil((expectedBytes * 8) / 5)

    if (/^[0-9a-fA-F]+$/.test(body) && body.length === hexLen) {
        return { algo, hex: body.toLowerCase() }
    }
    if (body.length === base32Len) {
        return { algo, hex: bytesToHex(decodeBase32(body)) }
    }
    // Fall back to base64 (with or without padding).
    return { algo, hex: bytesToHex(Uint8Array.from(atob(body), (c) => c.charCodeAt(0))) }
}

/**
 * Compute the output path of a fixed-output derivation.
 * Mirrors Nix's makeFixedOutputPath:
 *   - recursive (NAR) + sha256 → the "source" content-addressing method
 *   - everything else          → "output:out" over sha256("fixed:out:…")
 * @param {string} name
 * @param {{algo:string, hex:string, recursive:boolean}} info
 */
export function makeFixedOutputPath(name, info, storeDir = "/nix/store", references = []) {
    const { algo, hex, recursive } = info
    if (algo === "sha256" && recursive) {
        const type = "source" + [...references].sort().map((r) => `:${r}`).join("")
        const fingerprint = `${type}:sha256:${hex}:${storeDir}:${name}`
        return computeStorePath(type, fingerprint, name, storeDir)
    }
    // Non-recursive (flat) or non-sha256: references must be empty.
    const prefix = recursive ? "r:" : ""
    const innerDigest = sha256Hex(`fixed:out:${prefix}${algo}:${hex}:`)
    const fingerprint = `output:out:sha256:${innerDigest}:${storeDir}:${name}`
    return computeStorePath("output", fingerprint, name, storeDir)
}

/**
 * The hashDerivationModulo value of a fixed-output derivation (hex), used as the
 * inputDrvs key when this derivation is depended upon.
 */
export function fixedOutputModuloHash(info, outPath) {
    const { algo, hex, recursive } = info
    const prefix = recursive ? "r:" : ""
    return sha256Hex(`fixed:out:${prefix}${algo}:${hex}:${outPath}`)
}

/**
 * Convert hex string to bytes
 */
function hexToBytes(hex) {
    const bytes = []
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16))
    }
    return new Uint8Array(bytes)
}

/**
 * XOR-fold a hash to 20 bytes
 * Based on: https://bernsteinbear.com/blog/nix-by-hand/
 */
function compressHash(hashBytes) {
    const compressed = new Uint8Array(20)
    for (let i = 0; i < hashBytes.length; i++) {
        compressed[i % 20] ^= hashBytes[i]
    }
    return compressed
}

/**
 * Compute store path hash for a derivation
 * Based on Nix's store path computation algorithm
 */
export function computeStorePath(type, hashInput, name, storeDir = "/nix/store") {
    // 1. Compute SHA-256 hash of the input
    const fullHash = sha256Hex(hashInput)

    // 2. Convert to bytes
    const hashBytes = hexToBytes(fullHash)

    // 3. XOR-fold to 20 bytes (160 bits)
    const compressed = compressHash(hashBytes)

    // 4. Encode in Nix base-32 (with reverse byte order)
    const hashEncoded = encodeBase32(compressed)

    // 5. Construct the store path
    return `${storeDir}/${hashEncoded}-${name}`
}

/**
 * Serialize a derivation to ATerm format
 * This is the format used in .drv files
 */
export function serializeDerivation(drv) {
    // Helper to serialize a list of strings
    const serializeStringList = (list) => {
        return "[" + list.map(s => JSON.stringify(s)).join(",") + "]"
    }

    // Helper to serialize key-value pairs
    const serializeEnv = (env) => {
        const pairs = Object.entries(env)
            // Use lexicographic (byte-wise) sort, not locale-aware sort
            // Nix uses strcmp which compares ASCII values directly
            .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
            .map(([k, v]) => `(${JSON.stringify(k)},${JSON.stringify(v)})`)
        return "[" + pairs.join(",") + "]"
    }

    // Serialize outputs
    const outputs = drv.outputs.map(([name, path, hashAlgo, hash]) => {
        return `(${JSON.stringify(name)},${JSON.stringify(path)},${JSON.stringify(hashAlgo)},${JSON.stringify(hash)})`
    }).join(",")

    // Serialize input derivations
    const inputDrvs = drv.inputDrvs.map(([path, outputs]) => {
        return `(${JSON.stringify(path)},${serializeStringList(outputs)})`
    }).join(",")

    // Serialize input sources
    const inputSrcs = drv.inputSrcs.map(s => JSON.stringify(s)).join(",")

    return `Derive([${outputs}],[${inputDrvs}],[${inputSrcs}],${JSON.stringify(drv.system)},${JSON.stringify(drv.builder)},${serializeStringList(drv.args)},${serializeEnv(drv.env)})`
}

/**
 * Compute the hash for a derivation's output path
 * This uses the "output:..." string format for fixed-output derivations
 */
export function computeOutputPath(drvSerialized, outputName, name, storeDir = "/nix/store") {
    // For non-fixed-output derivations, the output path is computed from
    // a hash of: "output:" + outputName + ":sha256:" + hash(drvSerialized) + ":" + storeDir + ":" + name

    // First compute the hash of the derivation
    const drvHash = sha256Hex(drvSerialized)

    // Create the hash input string
    const hashInput = `output:${outputName}:sha256:${drvHash}:${storeDir}:${name}`

    return computeStorePath("output", hashInput, name, storeDir)
}

/**
 * Compute the path for a .drv file
 * Uses the "text" content-addressing method
 * Based on: https://github.com/NixOS/nix/blob/master/src/libstore/store-api.cc
 */
export function computeDrvPath(drvSerialized, name, storeDir = "/nix/store", references = []) {
    // Step 1: Hash the .drv content
    const contentHash = sha256Hex(drvSerialized)

    // Step 2: Build fingerprint for text method.
    // Nix's makeTextPath embeds the referenced store paths (the .drv's input
    // derivations and input sources), sorted, into the type tag:
    //   "text:<ref1>:<ref2>:…:sha256:<content-hash>:<store-dir>:<name>"
    // With no references this collapses to "text:sha256:…".
    const drvName = name + ".drv"
    const refStr = [...references].sort().map((r) => `:${r}`).join("")
    const fingerprint = `text${refStr}:sha256:${contentHash}:${storeDir}:${drvName}`

    // Step 3: Hash the fingerprint
    const fingerprintHash = sha256Hex(fingerprint)
    const fingerprintBytes = hexToBytes(fingerprintHash)

    // Step 4: Compress to 20 bytes
    const compressed = compressHash(fingerprintBytes)

    // Step 5: Encode in base-32
    const hashEncoded = encodeBase32(compressed)

    // Step 6: Construct store path
    return `${storeDir}/${hashEncoded}-${drvName}`
}
