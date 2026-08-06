// Test builtins.toJSON with Path objects
import { assertEquals, assertStringIncludes } from "jsr:@std/assert@1"
import { createRuntime, builtins, Path } from "../runtime.js"

createRuntime()

Deno.test("toJSON - store path (from fetchTarball)", async () => {
    // Store paths pass through toJSON without being re-copied
    const storePath = new Path(["/nix/store/abc123-example/file.txt"], [])

    const result = await builtins.toJSON(storePath)

    // Should return JSON string of the path
    assertEquals(typeof result, "string")
    assertStringIncludes(result, "store")
    assertStringIncludes(result, "abc123-example")
})

Deno.test("toJSON - complex attrset with store path", async () => {
    const storePath = new Path(["/nix/store/xyz789-pkg/bin/tool"], [])

    const attrset = {
        name: "test",
        version: 1n,
        path: storePath
    }

    const result = await builtins.toJSON(attrset)

    // Should be valid JSON
    const parsed = JSON.parse(result)
    assertEquals(parsed.name, "test")
    assertEquals(parsed.version, 1)
    assertStringIncludes(parsed.path, "store")
    assertStringIncludes(parsed.path, "xyz789-pkg")
})

Deno.test("toJSON - local filesystem path copies to store", async () => {
    // Create a temporary file
    const tempDir = await Deno.makeTempDir()
    const testFile = `${tempDir}/test.txt`
    await Deno.writeTextFile(testFile, "Test content for toJSON")

    try {
        const localPath = new Path([testFile], [])

        const result = await builtins.toJSON(localPath)

        // Should return JSON string of store path
        assertEquals(typeof result, "string")
        const parsed = JSON.parse(result)
        assertStringIncludes(parsed, "store")
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})
