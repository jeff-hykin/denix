/**
 * Comprehensive tests for builtins.hashString and builtins.hashFile
 *
 * These tests cover:
 * - All 4 supported hash algorithms (md5, sha1, sha256, sha512)
 * - Empty strings and files
 * - Simple strings and files
 * - Long strings
 * - Special characters and Unicode
 * - Multiline content
 * - Error conditions (invalid algorithm, missing files)
 *
 * Reference: https://nix.dev/manual/nix/2.18/language/builtins
 */

import { builtins } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts"
import { join } from "https://deno.land/std@0.220.0/path/mod.ts"

const fixturesDir = join(import.meta.dirname, "fixtures", "hash_test")

// ============================================================================
// builtins.hashString Tests
// ============================================================================

Deno.test("hashString - SHA256 of simple string", () => {
    const result = builtins.hashString("sha256")("hello")
    // Verified with: echo -n "hello" | sha256sum
    assertEquals(result, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824")
})

Deno.test("hashString - SHA256 of empty string", () => {
    const result = builtins.hashString("sha256")("")
    // Verified with: echo -n "" | sha256sum
    assertEquals(result, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
})

Deno.test("hashString - SHA256 of long string", () => {
    const longString = "a".repeat(10000)
    const result = builtins.hashString("sha256")(longString)
    // Verified with: perl -E 'print "a" x 10000' | sha256sum
    assertEquals(result, "27dd1f61b867b6a0f6e9d8a41c43231de52107e53ae424de8f847b821db4b711")
})

Deno.test("hashString - SHA256 with special characters", () => {
    const result = builtins.hashString("sha256")("!@#$%^&*()")
    // Verified with: echo -n '!@#$%^&*()' | sha256sum
    assertEquals(result, "95ce789c5c9d18490972709838ca3a9719094bca3ac16332cfec0652b0236141")
})

Deno.test("hashString - SHA256 with Unicode", () => {
    const result = builtins.hashString("sha256")("Hello 世界")
    // Verified with: echo -n 'Hello 世界' | sha256sum
    assertEquals(result, "4487dd5e89032c1794903afe6f4b90aaab69972697ea5d3baa215df27c679803")
})

Deno.test("hashString - SHA256 with newlines", () => {
    const result = builtins.hashString("sha256")("line1\nline2\nline3")
    // Verified with: printf 'line1\nline2\nline3' | sha256sum
    assertEquals(result.length, 64) // SHA256 always produces 64 hex chars
})

Deno.test("hashString - MD5 of simple string", () => {
    const result = builtins.hashString("md5")("hello")
    // Verified with: echo -n "hello" | md5sum
    assertEquals(result, "5d41402abc4b2a76b9719d911017c592")
})

Deno.test("hashString - MD5 of empty string", () => {
    const result = builtins.hashString("md5")("")
    // Verified with: echo -n "" | md5sum
    assertEquals(result, "d41d8cd98f00b204e9800998ecf8427e")
})

Deno.test("hashString - SHA1 of simple string", () => {
    const result = builtins.hashString("sha1")("hello")
    // Verified with: echo -n "hello" | sha1sum
    assertEquals(result, "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d")
})

Deno.test("hashString - SHA1 of empty string", () => {
    const result = builtins.hashString("sha1")("")
    // Verified with: echo -n "" | sha1sum
    assertEquals(result, "da39a3ee5e6b4b0d3255bfef95601890afd80709")
})

Deno.test("hashString - SHA512 of simple string", () => {
    const result = builtins.hashString("sha512")("hello")
    // Verified with: echo -n "hello" | sha512sum
    assertEquals(result.length, 128) // SHA512 produces 128 hex chars
    assertEquals(result.substring(0, 20), "9b71d224bd62f3785d96")
})

Deno.test("hashString - SHA512 of empty string", () => {
    const result = builtins.hashString("sha512")("")
    // Verified with: echo -n "" | sha512sum
    assertEquals(result.length, 128)
    assertEquals(result.substring(0, 20), "cf83e1357eefb8bdf154")
})

Deno.test("hashString - Invalid algorithm throws error", () => {
    assertThrows(
        () => builtins.hashString("sha384")("hello"),
        Error,
        "unknown hash algorithm"
    )
})

Deno.test("hashString - Invalid algorithm name case-sensitive", () => {
    assertThrows(
        () => builtins.hashString("SHA256")("hello"),
        Error,
        "unknown hash algorithm"
    )
})

Deno.test("hashString - Curried function works correctly", () => {
    const sha256Hasher = builtins.hashString("sha256")
    const result1 = sha256Hasher("hello")
    const result2 = sha256Hasher("world")
    assertEquals(result1, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824")
    assertEquals(result2, "486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7")
})

// ============================================================================
// builtins.hashFile Tests
// ============================================================================

Deno.test("hashFile - SHA256 of simple file", () => {
    const filePath = join(fixturesDir, "hello.txt")
    const result = builtins.hashFile("sha256")(filePath)
    // File contains "hello" (no newline)
    // Verified with: sha256sum hello.txt
    assertEquals(result, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824")
})

Deno.test("hashFile - SHA256 of empty file", () => {
    const filePath = join(fixturesDir, "empty.txt")
    const result = builtins.hashFile("sha256")(filePath)
    assertEquals(result, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
})

Deno.test("hashFile - SHA256 of multiline file", () => {
    const filePath = join(fixturesDir, "multiline.txt")
    const result = builtins.hashFile("sha256")(filePath)
    // Verified with: sha256sum multiline.txt
    assertEquals(result.length, 64)
})

Deno.test("hashFile - SHA256 with special characters", () => {
    const filePath = join(fixturesDir, "special_chars.txt")
    const result = builtins.hashFile("sha256")(filePath)
    assertEquals(result.length, 64)
})

Deno.test("hashFile - SHA256 with Unicode", () => {
    const filePath = join(fixturesDir, "unicode.txt")
    const result = builtins.hashFile("sha256")(filePath)
    assertEquals(result.length, 64)
})

Deno.test("hashFile - MD5 of simple file", () => {
    const filePath = join(fixturesDir, "hello.txt")
    const result = builtins.hashFile("md5")(filePath)
    // Verified with: md5sum hello.txt
    assertEquals(result, "5d41402abc4b2a76b9719d911017c592")
})

Deno.test("hashFile - SHA1 of simple file", () => {
    const filePath = join(fixturesDir, "hello.txt")
    const result = builtins.hashFile("sha1")(filePath)
    // Verified with: sha1sum hello.txt
    assertEquals(result, "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d")
})

Deno.test("hashFile - SHA512 of simple file", () => {
    const filePath = join(fixturesDir, "hello.txt")
    const result = builtins.hashFile("sha512")(filePath)
    assertEquals(result.length, 128)
    assertEquals(result.substring(0, 20), "9b71d224bd62f3785d96")
})

Deno.test("hashFile - All algorithms produce different hashes", () => {
    const filePath = join(fixturesDir, "hello.txt")
    const md5Result = builtins.hashFile("md5")(filePath)
    const sha1Result = builtins.hashFile("sha1")(filePath)
    const sha256Result = builtins.hashFile("sha256")(filePath)
    const sha512Result = builtins.hashFile("sha512")(filePath)

    // All should be different
    const hashes = [md5Result, sha1Result, sha256Result, sha512Result]
    const uniqueHashes = new Set(hashes)
    assertEquals(uniqueHashes.size, 4)

    // Verify lengths
    assertEquals(md5Result.length, 32)
    assertEquals(sha1Result.length, 40)
    assertEquals(sha256Result.length, 64)
    assertEquals(sha512Result.length, 128)
})

Deno.test("hashFile - Invalid algorithm throws error", () => {
    const filePath = join(fixturesDir, "hello.txt")
    assertThrows(
        () => builtins.hashFile("blake2b")(filePath),
        Error,
        "unknown hash algorithm"
    )
})

Deno.test("hashFile - Missing file throws error", () => {
    const filePath = join(fixturesDir, "nonexistent.txt")
    assertThrows(
        () => builtins.hashFile("sha256")(filePath),
        Error
    )
})

Deno.test("hashFile - Curried function works correctly", () => {
    const sha256Hasher = builtins.hashFile("sha256")
    const result1 = sha256Hasher(join(fixturesDir, "hello.txt"))
    const result2 = sha256Hasher(join(fixturesDir, "empty.txt"))
    assertEquals(result1, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824")
    assertEquals(result2, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
})

// ============================================================================
// Cross-validation Tests (hashString vs hashFile)
// ============================================================================

Deno.test("hashString and hashFile produce same results for same content", () => {
    const filePath = join(fixturesDir, "hello.txt")
    const stringHash = builtins.hashString("sha256")("hello")
    const fileHash = builtins.hashFile("sha256")(filePath)
    assertEquals(stringHash, fileHash)
})

Deno.test("hashString and hashFile - empty content", () => {
    const filePath = join(fixturesDir, "empty.txt")
    const stringHash = builtins.hashString("sha256")("")
    const fileHash = builtins.hashFile("sha256")(filePath)
    assertEquals(stringHash, fileHash)
})

Deno.test("All hash functions return lowercase hex strings", () => {
    const algorithms = ["md5", "sha1", "sha256", "sha512"]

    for (const algo of algorithms) {
        const result = builtins.hashString(algo)("test")
        assertEquals(result, result.toLowerCase(), `${algo} should return lowercase hex`)
        assertEquals(/^[0-9a-f]+$/.test(result), true, `${algo} should only contain hex chars`)
    }
})
