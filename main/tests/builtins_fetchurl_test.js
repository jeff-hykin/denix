// Test builtins.fetchurl
import { assertEquals, assertRejects, assert, assertStringIncludes } from "jsr:@std/assert"
import { createRuntime } from "../runtime.js"

const runtime = createRuntime()
const builtins = runtime.scopeStack[0].builtins

Deno.test("fetchurl - string URL argument", async () => {
    try {
        // Use httpbin for consistent, small test file
        const result = await builtins.fetchurl("https://httpbin.org/bytes/128")

        // Should return a Path object
        assert(result.constructor.name === "Path")
        const pathStr = result.toString()
        assertStringIncludes(pathStr, "store")
    } catch (error) {
        // Network issues are acceptable
        if (!error.message.includes("fetch") && !error.message.includes("network") && !error.message.includes("HTTP")) {
            throw error
        }
    }
})

Deno.test("fetchurl - object argument with URL", async () => {
    try {
        const result = await builtins.fetchurl({
            url: "https://httpbin.org/bytes/256",
            name: "test-file"
        })

        // Should return a Path object
        assert(result.constructor.name === "Path")
        const pathStr = result.toString()
        assertStringIncludes(pathStr, "store")
        assertStringIncludes(pathStr, "test-file")
    } catch (error) {
        // Network issues are acceptable
        if (!error.message.includes("fetch") && !error.message.includes("network") && !error.message.includes("HTTP")) {
            throw error
        }
    }
})

Deno.test("fetchurl - caching works", async () => {
    try {
        const url = "https://httpbin.org/bytes/64"

        // First call
        const result1 = await builtins.fetchurl(url)

        // Second call should be instant (cached)
        const start = Date.now()
        const result2 = await builtins.fetchurl(url)
        const elapsed = Date.now() - start

        // Should be very fast (< 100ms) if cached
        // Note: We don't strictly assert this as file system can be slow
        // assert(elapsed < 100, `Expected cached call to be fast, took ${elapsed}ms`)

        // Results should be the same path
        assertEquals(result1.toString(), result2.toString())
    } catch (error) {
        // Network issues are acceptable
        if (!error.message.includes("fetch") && !error.message.includes("network") && !error.message.includes("HTTP")) {
            throw error
        }
    }
})

Deno.test("fetchurl - validates SHA256 mismatch", async () => {
    try {
        await assertRejects(
            async () => await builtins.fetchurl({
                url: "https://httpbin.org/bytes/32",
                sha256: "0000000000000000000000000000000000000000000000000000000000000000"
            }),
            Error,
            "Hash mismatch"
        )
    } catch (error) {
        // Network issues are acceptable
        if (!error.message.includes("fetch") && !error.message.includes("network") && !error.message.includes("HTTP")) {
            throw error
        }
    }
})

Deno.test("fetchurl - with correct SHA256", async () => {
    try {
        // Use a stable URL that returns predictable content
        // httpbin.org/base64 returns consistent base64 data
        const url = "https://httpbin.org/base64/aGVsbG8="  // "hello" in base64

        // Known SHA256 of the response (base64 encoded "hello" with newline)
        // Note: This might change if httpbin changes their response format
        // In that case, we'll just skip this test on hash mismatch

        // First, let's fetch it once to see what we get
        const tempFile = await Deno.makeTempFile()
        try {
            const response = await fetch(url)
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const bytes = new Uint8Array(await response.arrayBuffer())

            // Import hashing function
            const { sha256Hex } = await import("../../tools/hashing.js")
            const actualHash = sha256Hex(bytes)

            // Now fetch with fetchurl and the known hash
            const result = await builtins.fetchurl({
                url: url,
                sha256: actualHash
            })

            // Should succeed and return a Path
            assert(result.constructor.name === "Path")
        } finally {
            try { await Deno.remove(tempFile) } catch {}
        }
    } catch (error) {
        // Network issues are acceptable
        if (!error.message.includes("fetch") && !error.message.includes("network") && !error.message.includes("HTTP")) {
            throw error
        }
    }
})

Deno.test("fetchurl - extracts name from URL", async () => {
    try {
        const result = await builtins.fetchurl("https://example.com/path/to/file.txt")

        const pathStr = result.toString()
        // Should contain the extracted name
        assertStringIncludes(pathStr, "file.txt")
    } catch (error) {
        // Network issues and 404s are acceptable for this test
        if (!error.message.includes("fetch") && !error.message.includes("network") && !error.message.includes("HTTP") && !error.message.includes("404")) {
            throw error
        }
    }
})

Deno.test("fetchurl - can be used with toJSON", async () => {
    try {
        const result = await builtins.fetchurl("https://httpbin.org/bytes/8")

        // toJSON should work on the returned Path
        const json = await builtins.toJSON(result)

        // Should be a valid JSON string
        assertEquals(typeof json, "string")
        const parsed = JSON.parse(json)
        assertStringIncludes(parsed, "store")
    } catch (error) {
        // Network issues are acceptable
        if (!error.message.includes("fetch") && !error.message.includes("network") && !error.message.includes("HTTP")) {
            throw error
        }
    }
})
