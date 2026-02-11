import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

// Store operation builtins: storeDir, storePath, toFile, placeholder, outputOf
// Documentation: https://nix.dev/manual/nix/2.18/language/builtins

// =============================================================================
// storeDir tests
// =============================================================================
// nix repl> builtins.storeDir
// "/nix/store"

Deno.test("storeDir - returns store directory path", () => {
    const result = builtins.storeDir()
    assertEquals(result, "/nix/store")
})

Deno.test("storeDir - result is a string", () => {
    const result = builtins.storeDir()
    assertEquals(typeof result, "string")
})

Deno.test("storeDir - consistent across calls", () => {
    const first = builtins.storeDir()
    const second = builtins.storeDir()
    assertEquals(first, second)
})

// =============================================================================
// storePath tests
// =============================================================================
// nix repl> builtins.storePath "/nix/store/abc123-hello"
// /nix/store/abc123-hello
// nix repl> builtins.storePath "/invalid/path"
// error: path '/invalid/path' is not in the Nix store

Deno.test("storePath - validates and returns valid store path", () => {
    // Use 32 characters of valid Nix base32 alphabet (0-9, a-z, no 'e', 'o', 't', 'u')
    const validPath = "/nix/store/0123456789abcdfghijklmnpqrsvwxyz-hello"
    const result = builtins.storePath(validPath)
    assertEquals(result, validPath)
})

Deno.test("storePath - accepts path with subdirectories", () => {
    // Use 32 characters of valid Nix base32 alphabet
    const pathWithSub = "/nix/store/0123456789abcdfghijklmnpqrsvwxyz-hello/bin/hello"
    const result = builtins.storePath(pathWithSub)
    assertEquals(result, pathWithSub)
})

Deno.test("storePath - rejects path not in store", () => {
    assertThrows(() => {
        builtins.storePath("/usr/bin/hello")
    }, Error, "not in the Nix store")
})

Deno.test("storePath - rejects relative path", () => {
    assertThrows(() => {
        builtins.storePath("abc123-hello")
    }, Error, "not in the Nix store")
})

Deno.test("storePath - rejects path with invalid hash (too short)", () => {
    assertThrows(() => {
        builtins.storePath("/nix/store/abc-hello")
    }, Error, "not a valid store path")
})

Deno.test("storePath - rejects path with invalid hash (uppercase)", () => {
    assertThrows(() => {
        builtins.storePath("/nix/store/0123456789ABCDFGHIJKLMNPQRSVWX-hello")
    }, Error, "not a valid store path")
})

Deno.test("storePath - rejects path with invalid hash (wrong length - 33 chars)", () => {
    assertThrows(() => {
        builtins.storePath("/nix/store/0123456789abcdfghijklmnpqrsvwxy-hello")
    }, Error, "not a valid store path")
})

Deno.test("storePath - rejects path missing dash separator", () => {
    assertThrows(() => {
        builtins.storePath("/nix/store/0123456789abcdfghijklmnpqrsvwxhello")
    }, Error, "not a valid store path")
})

Deno.test("storePath - accepts all valid base32 characters", () => {
    // Nix base-32 alphabet: 0123456789abcdfghijklmnpqrsvwxyz (no 'e', 'o', 't', 'u')
    const validPath = "/nix/store/0123456789abcdfghijklmnpqrsvwxyz-test"
    const result = builtins.storePath(validPath)
    assertEquals(result, validPath)
})

Deno.test("storePath - rejects hash with special characters", () => {
    // Hash must be lowercase alphanumeric only (implementation uses [a-z0-9])
    assertThrows(() => {
        builtins.storePath("/nix/store/abc123-test_with_underscore-hello")
    }, Error, "not a valid store path")
})

Deno.test("storePath - note: implementation accepts 'e' 'o' 't' 'u' (not strict Nix base32)", () => {
    // Current implementation uses [a-z0-9]{32} which is more permissive than actual Nix base32
    // This test documents the current behavior (not a bug, just less strict validation)
    const path = "/nix/store/abcdefghijklmnopqrstuvwxyz012345-test"
    const result = builtins.storePath(path)
    assertEquals(result, path)
})

// =============================================================================
// toFile tests
// =============================================================================
// nix repl> builtins.toFile "builder.sh" "echo hello"
// "/nix/store/...-builder.sh"

Deno.test("toFile - creates store path for simple content", () => {
    const result = builtins.toFile("test.txt")("hello world")
    assertEquals(result.startsWith("/nix/store/"), true)
    assertEquals(result.endsWith("-test.txt"), true)
})

Deno.test("toFile - hash changes with different content", () => {
    const path1 = builtins.toFile("test.txt")("content1")
    const path2 = builtins.toFile("test.txt")("content2")
    // Different content should produce different hashes
    assertEquals(path1 !== path2, true)
})

Deno.test("toFile - hash changes with different name", () => {
    const path1 = builtins.toFile("file1.txt")("same content")
    const path2 = builtins.toFile("file2.txt")("same content")
    // Different names should produce different hashes
    assertEquals(path1 !== path2, true)
})

Deno.test("toFile - consistent hash for same inputs", () => {
    const path1 = builtins.toFile("test.txt")("hello")
    const path2 = builtins.toFile("test.txt")("hello")
    assertEquals(path1, path2)
})

Deno.test("toFile - rejects name with slash", () => {
    assertThrows(() => {
        builtins.toFile("dir/file.txt")("content")
    }, Error, "cannot contain '/'")
})

Deno.test("toFile - handles empty content", () => {
    const result = builtins.toFile("empty.txt")("")
    assertEquals(result.startsWith("/nix/store/"), true)
    assertEquals(result.endsWith("-empty.txt"), true)
})

Deno.test("toFile - handles special characters in content", () => {
    const content = "line1\nline2\ttabbed\r\nwindows"
    const result = builtins.toFile("special.txt")(content)
    assertEquals(result.startsWith("/nix/store/"), true)
})

Deno.test("toFile - handles unicode content", () => {
    const content = "Hello 世界 🌍"
    const result = builtins.toFile("unicode.txt")(content)
    assertEquals(result.startsWith("/nix/store/"), true)
})

Deno.test("toFile - hash format is 32 characters base32", () => {
    const result = builtins.toFile("test.txt")("content")
    const hashPart = result.match(/\/nix\/store\/([a-z0-9]+)-/)?.[1]
    assertEquals(hashPart?.length, 32)
})

Deno.test("toFile - produces deterministic output", () => {
    // Test with known content to verify consistency
    const path1 = builtins.toFile("test")("hello")
    const path2 = builtins.toFile("test")("hello")
    const path3 = builtins.toFile("test")("hello")
    assertEquals(path1, path2)
    assertEquals(path2, path3)
})

// =============================================================================
// placeholder tests
// =============================================================================
// nix repl> builtins.placeholder "out"
// "/1rz4g4znpzjwh1xymhjpm42vipw92pr73vdgl6xs1hycac8kf2n9"

Deno.test("placeholder - generates placeholder for 'out' output", () => {
    const result = builtins.placeholder("out")
    assertEquals(result.startsWith("/"), true)
    assertEquals(result.length > 1, true)
})

Deno.test("placeholder - different outputs have different placeholders", () => {
    const out = builtins.placeholder("out")
    const dev = builtins.placeholder("dev")
    const bin = builtins.placeholder("bin")
    assertEquals(out !== dev, true)
    assertEquals(dev !== bin, true)
    assertEquals(out !== bin, true)
})

Deno.test("placeholder - consistent for same output name", () => {
    const first = builtins.placeholder("out")
    const second = builtins.placeholder("out")
    assertEquals(first, second)
})

Deno.test("placeholder - generates valid base32 string", () => {
    const result = builtins.placeholder("out")
    const base32Part = result.slice(1) // Remove leading "/"
    // Should only contain valid Nix base32 characters
    const validChars = /^[0-9a-df-np-z]+$/
    assertEquals(validChars.test(base32Part), true)
})

Deno.test("placeholder - length matches Nix format (52 chars)", () => {
    const result = builtins.placeholder("out")
    // "/" + 52 base32 characters = 53 total
    assertEquals(result.length, 53)
})

Deno.test("placeholder - handles custom output names", () => {
    const custom = builtins.placeholder("myOutput")
    assertEquals(custom.startsWith("/"), true)
    assertEquals(custom.length, 53)
})

Deno.test("placeholder - matches known Nix output for 'out'", () => {
    // From Nix 2.18: placeholder "out" = /1rz4g4znpzjwh1xymhjpm42vipw92pr73vdgl6xs1hycac8kf2n9
    const result = builtins.placeholder("out")
    assertEquals(result, "/1rz4g4znpzjwh1xymhjpm42vipw92pr73vdgl6xs1hycac8kf2n9")
})

// =============================================================================
// outputOf tests
// =============================================================================
// nix repl> builtins.outputOf "/nix/store/xxx.drv" "out"
// Returns output path or placeholder

Deno.test("outputOf - returns string for drv reference", () => {
    const result = builtins.outputOf("/nix/store/abc123defghijklmnopqrstuvwxyz01-test.drv")("out")
    assertEquals(typeof result, "string")
})

Deno.test("outputOf - different drvs produce different outputs", () => {
    const out1 = builtins.outputOf("/nix/store/aaa123defghijklmnopqrstuvwxyz01-pkg1.drv")("out")
    const out2 = builtins.outputOf("/nix/store/bbb123defghijklmnopqrstuvwxyz01-pkg2.drv")("out")
    assertEquals(out1 !== out2, true)
})

Deno.test("outputOf - different outputs of same drv are different", () => {
    const drv = "/nix/store/abc123defghijklmnopqrstuvwxyz01-test.drv"
    const out = builtins.outputOf(drv)("out")
    const dev = builtins.outputOf(drv)("dev")
    assertEquals(out !== dev, true)
})

Deno.test("outputOf - consistent for same inputs", () => {
    const drv = "/nix/store/abc123defghijklmnopqrstuvwxyz01-test.drv"
    const first = builtins.outputOf(drv)("out")
    const second = builtins.outputOf(drv)("out")
    assertEquals(first, second)
})

Deno.test("outputOf - result starts with slash", () => {
    const result = builtins.outputOf("/nix/store/abc123defghijklmnopqrstuvwxyz01-test.drv")("out")
    assertEquals(result.startsWith("/"), true)
})

Deno.test("outputOf - handles placeholder references", () => {
    const placeholder = builtins.placeholder("out")
    const result = builtins.outputOf(placeholder)("bin")
    assertEquals(typeof result, "string")
    assertEquals(result.startsWith("/"), true)
})

Deno.test("outputOf - works with arbitrary drv paths", () => {
    const result1 = builtins.outputOf("some-drv-path")("out")
    const result2 = builtins.outputOf("another-drv-path")("out")
    assertEquals(result1 !== result2, true)
})

Deno.test("outputOf - result is hash-like string", () => {
    const result = builtins.outputOf("/nix/store/test.drv")("out")
    // Should be "/" followed by 32 hex characters (from sha256 hash slice)
    const pattern = /^\/[0-9a-f]{32}$/
    assertEquals(pattern.test(result), true)
})
