// Store path computation utilities for Nix derivations
// Based on: https://nix.dev/manual/nix/2.22/protocols/store-path

import { sha256Hex } from "./hashing.js"

// Nix's base-32 alphabet (note: no 'e', 'o', 't', 'u')
const NIX_BASE32_ALPHABET = "0123456789abcdfghijklmnpqrsvwxyz"

/**
 * Encode bytes to Nix base-32 format
 * Nix uses a custom base-32 encoding with a specific alphabet
 */
export function encodeBase32(bytes) {
    // Nix base-32 encoding is a bit different from standard
    // It encodes in 5-bit chunks from the input
    let result = ""
    let bits = 0
    let bitCount = 0

    for (const byte of bytes) {
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
 * Compute store path hash for a derivation
 * Based on Nix's store path computation algorithm
 */
export function computeStorePath(type, hashInput, name, storeDir = "/nix/store") {
    // 1. Compute SHA-256 hash of the input
    const fullHash = sha256Hex(hashInput)

    // 2. Convert to bytes and truncate to 160 bits (20 bytes)
    const hashBytes = hexToBytes(fullHash).slice(0, 20)

    // 3. Encode in Nix base-32
    const hashEncoded = encodeBase32(hashBytes)

    // 4. Construct the store path
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
 */
export function computeDrvPath(drvSerialized, name, storeDir = "/nix/store") {
    return computeStorePath("drv", drvSerialized, name + ".drv", storeDir)
}
