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
    // Nix encodes in REVERSE byte order
    const reversedBytes = Array.from(bytes).reverse()

    let result = ""
    let bits = 0
    let bitCount = 0

    for (const byte of reversedBytes) {
        bits = (bits << 8) | byte
        bitCount += 8

        while (bitCount >= 5) {
            bitCount -= 5
            const index = (bits >> bitCount) & 0x1f
            result += NIX_BASE32_ALPHABET[index]
        }
    }

    if (bitCount > 0) {
        const index = (bits << (5 - bitCount)) & 0x1f
        result += NIX_BASE32_ALPHABET[index]
    }

    return result
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
            .sort(([a], [b]) => a.localeCompare(b))
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
export function computeDrvPath(drvSerialized, name, storeDir = "/nix/store") {
    // Step 1: Hash the .drv content
    const contentHash = sha256Hex(drvSerialized)

    // Step 2: Build fingerprint for text method
    // Format: "text:sha256:<content-hash>:<store-dir>:<name>"
    const drvName = name + ".drv"
    const fingerprint = `text:sha256:${contentHash}:${storeDir}:${drvName}`

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
