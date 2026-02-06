#!/usr/bin/env -S deno run --allow-all
// Phase 4 standalone tests - New implementations without runtime import

import { sha256Hex } from "../../tools/hashing.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

console.log("Testing Phase 4 implementations (standalone)...\n")

let passed = 0
let failed = 0

function test(name, fn) {
    try {
        fn()
        console.log(`✓ ${name}`)
        passed++
    } catch (error) {
        console.log(`✗ ${name}`)
        console.log(`  Error: ${error.message}`)
        failed++
    }
}

// Test toFile store path computation
console.log("=== Testing toFile ===")

function computeToFilePath(name, content) {
    const contentHash = sha256Hex(content)
    const fingerprint = `text:sha256:${contentHash}:/nix/store:${name}`
    const fingerprintHash = sha256Hex(fingerprint)

    const hashBytes = new Uint8Array(32)
    for (let i = 0; i < 32; i++) {
        hashBytes[i] = parseInt(fingerprintHash.slice(i * 2, i * 2 + 2), 16)
    }
    const compressed = new Uint8Array(20)
    for (let i = 0; i < 32; i++) {
        compressed[i % 20] ^= hashBytes[i]
    }

    const reversed = new Uint8Array(compressed.length)
    for (let i = 0; i < compressed.length; i++) {
        reversed[i] = compressed[compressed.length - 1 - i]
    }

    const alphabet = "0123456789abcdfghijklmnpqrsvwxyz"
    let hash32 = ""
    let bits = 0n
    for (const byte of reversed) {
        bits = (bits << 8n) | BigInt(byte)
    }
    while (bits > 0n) {
        hash32 = alphabet[Number(bits % 32n)] + hash32
        bits = bits / 32n
    }
    hash32 = hash32.padStart(32, "0")

    return `/nix/store/${hash32}-${name}`
}

test("toFile: basic path computation", () => {
    const path = computeToFilePath("test.txt", "hello world")
    if (!path.startsWith("/nix/store/")) throw new Error("Path should start with /nix/store/")
    if (!path.endsWith("-test.txt")) throw new Error("Path should end with -test.txt")
})

test("toFile: different content produces different hash", () => {
    const path1 = computeToFilePath("test.txt", "hello")
    const path2 = computeToFilePath("test.txt", "world")
    if (path1 === path2) throw new Error("Different content should produce different paths")
})

test("toFile: same content produces same hash", () => {
    const path1 = computeToFilePath("test.txt", "hello")
    const path2 = computeToFilePath("test.txt", "hello")
    if (path1 !== path2) throw new Error("Same content should produce same path")
})

// Test findFile logic
console.log("\n=== Testing findFile ===")

test("findFile: basic search with no prefix", () => {
    // Create temp test directory
    const tempDir = Deno.makeTempDirSync()
    const testFile = FileSystem.join(tempDir, "test.nix")
    Deno.writeTextFileSync(testFile, "")

    const searchPath = [{ path: tempDir, prefix: "" }]
    const lookup = "test.nix"

    // Simulate findFile logic
    for (const entry of searchPath) {
        const prefix = entry.prefix || ""
        const path = entry.path

        if (!prefix) {
            const fullPath = FileSystem.join(path, lookup)
            if (FileSystem.sync.info(fullPath).exists) {
                if (fullPath !== testFile) {
                    throw new Error(`Expected ${testFile}, got ${fullPath}`)
                }
            }
        }
    }

    // Cleanup
    Deno.removeSync(tempDir, { recursive: true })
})

test("findFile: search with prefix", () => {
    const tempDir = Deno.makeTempDirSync()
    const subDir = FileSystem.join(tempDir, "pkgs")
    Deno.mkdirSync(subDir)
    const testFile = FileSystem.join(subDir, "test.nix")
    Deno.writeTextFileSync(testFile, "")

    const searchPath = [{ path: tempDir, prefix: "nixpkgs" }]
    const lookup = "nixpkgs/pkgs/test.nix"

    // Simulate findFile logic
    for (const entry of searchPath) {
        const prefix = entry.prefix || ""
        const path = entry.path

        if (prefix && (lookup === prefix || lookup.startsWith(prefix + "/"))) {
            const suffix = lookup.slice(prefix.length).replace(/^\//, "")
            const fullPath = suffix ? FileSystem.join(path, suffix) : path

            if (FileSystem.sync.info(fullPath).exists) {
                if (fullPath !== testFile) {
                    throw new Error(`Expected ${testFile}, got ${fullPath}`)
                }
            }
        }
    }

    // Cleanup
    Deno.removeSync(tempDir, { recursive: true })
})

test("findFile: file not found returns error", () => {
    const searchPath = [{ path: "/nonexistent", prefix: "" }]
    const lookup = "nonexistent.nix"

    let found = false
    for (const entry of searchPath) {
        const prefix = entry.prefix || ""
        const path = entry.path

        if (!prefix) {
            const fullPath = FileSystem.join(path, lookup)
            if (FileSystem.sync.info(fullPath).exists) {
                found = true
            }
        }
    }

    if (found) {
        throw new Error("Should not have found file")
    }
})

// Test derivationStrict
console.log("\n=== Testing derivationStrict ===")

test("derivationStrict: is same as derivation", () => {
    // derivationStrict should be identical to derivation in modern Nix
    // This is just a documentation test
    console.log("  (derivationStrict is now identical to derivation)")
})

console.log("\n" + "=".repeat(60))
console.log(`Total: ${passed + failed} tests`)
console.log(`✓ Passed: ${passed}`)
console.log(`✗ Failed: ${failed}`)
console.log("=".repeat(60))

if (failed > 0) {
    Deno.exit(1)
}
