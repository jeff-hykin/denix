// Test builtins.path
import { assertEquals, assertRejects, assert, assertStringIncludes } from "jsr:@std/assert"
import { createRuntime } from "../runtime.js"

const runtime = createRuntime()
const builtins = runtime.scopeStack[0].builtins

Deno.test("builtins.path - copy single file", async () => {
    // Create a test file
    const tempDir = await Deno.makeTempDir()
    const testFile = `${tempDir}/test.txt`
    await Deno.writeTextFile(testFile, "Hello, World!")

    try {
        // Copy to store
        const result = await builtins.path({
            path: testFile
        })

        // Should return a Path object
        assert(result.constructor.name === "Path")
        const storePath = result.toString()
        assertStringIncludes(storePath, "store")

        // File should exist in store
        const storeInfo = await Deno.stat(storePath)
        assert(storeInfo.isFile || storeInfo.isDirectory)

        // If it's a directory, check for the file inside
        if (storeInfo.isDirectory) {
            const fileInStore = `${storePath}/test.txt`
            const fileContent = await Deno.readTextFile(fileInStore)
            assertEquals(fileContent, "Hello, World!")
        }
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("builtins.path - copy directory recursively", async () => {
    // Create a test directory structure
    const tempDir = await Deno.makeTempDir()
    await Deno.mkdir(`${tempDir}/myproject/subdir`, { recursive: true })
    await Deno.writeTextFile(`${tempDir}/myproject/file1.txt`, "Content 1")
    await Deno.writeTextFile(`${tempDir}/myproject/subdir/file2.txt`, "Content 2")

    try {
        // Copy to store
        const result = await builtins.path({
            path: `${tempDir}/myproject`,
            recursive: true
        })

        // Should return a Path object
        assert(result.constructor.name === "Path")
        const storePath = result.toString()
        assertStringIncludes(storePath, "store")
        assertStringIncludes(storePath, "myproject")

        // Directory should exist in store
        const storeInfo = await Deno.stat(storePath)
        assert(storeInfo.isDirectory)

        // Files should exist
        const file1 = await Deno.readTextFile(`${storePath}/file1.txt`)
        assertEquals(file1, "Content 1")

        const file2 = await Deno.readTextFile(`${storePath}/subdir/file2.txt`)
        assertEquals(file2, "Content 2")
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("builtins.path - with filter function", async () => {
    // Create a test directory with multiple files
    const tempDir = await Deno.makeTempDir()
    await Deno.writeTextFile(`${tempDir}/keep.txt`, "Keep this")
    await Deno.writeTextFile(`${tempDir}/remove.log`, "Remove this")
    await Deno.writeTextFile(`${tempDir}/keep2.txt`, "Keep this too")

    try {
        // Copy to store, filtering out .log files
        const result = await builtins.path({
            path: tempDir,
            filter: (path) => (type) => {
                // Exclude .log files
                return !path.endsWith(".log")
            },
            recursive: true
        })

        const storePath = result.toString()

        // .txt files should exist
        const files = []
        for await (const entry of Deno.readDir(storePath)) {
            files.push(entry.name)
        }

        assert(files.includes("keep.txt"))
        assert(files.includes("keep2.txt"))
        assert(!files.includes("remove.log"))
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("builtins.path - custom name parameter", async () => {
    // Create a test file
    const tempDir = await Deno.makeTempDir()
    const testFile = `${tempDir}/original.txt`
    await Deno.writeTextFile(testFile, "Content")

    try {
        // Copy with custom name
        const result = await builtins.path({
            path: testFile,
            name: "custom-name"
        })

        const storePath = result.toString()
        assertStringIncludes(storePath, "custom-name")
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("builtins.path - validates sha256", async () => {
    // Create a test file
    const tempDir = await Deno.makeTempDir()
    const testFile = `${tempDir}/test.txt`
    const content = "Known content for hash validation"
    await Deno.writeTextFile(testFile, content)

    try {
        // Compute the expected hash directly from the file
        const { sha256Hex } = await import("../../tools/hashing.js")
        const fileBytes = await Deno.readFile(testFile)
        const expectedHash = sha256Hex(fileBytes)

        // Now try with the correct hash
        const result = await builtins.path({
            path: testFile,
            sha256: expectedHash
        })

        // Should succeed
        assert(result.constructor.name === "Path")

        // Now try with wrong hash - should fail
        await assertRejects(
            async () => await builtins.path({
                path: testFile,
                sha256: "0000000000000000000000000000000000000000000000000000000000000000"
            }),
            Error,
            "Hash mismatch"
        )
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("builtins.path - nonexistent path throws error", async () => {
    await assertRejects(
        async () => await builtins.path({
            path: "/nonexistent/path/that/does/not/exist"
        }),
        Error,
        "does not exist"
    )
})

Deno.test("builtins.path - preserves executable bit", async () => {
    // Create an executable file
    const tempDir = await Deno.makeTempDir()
    const testFile = `${tempDir}/script.sh`
    await Deno.writeTextFile(testFile, "#!/bin/bash\necho hello")
    await Deno.chmod(testFile, 0o755)

    try {
        // Copy to store
        const result = await builtins.path({
            path: testFile
        })

        const storePath = result.toString()

        // Find the file in store (might be stored as directory containing file)
        let scriptPath = storePath
        const storeInfo = await Deno.stat(storePath)
        if (storeInfo.isDirectory) {
            scriptPath = `${storePath}/script.sh`
        }

        // Check if executable bit is preserved
        const scriptInfo = await Deno.stat(scriptPath)
        // Check if any execute bit is set (user, group, or other)
        assert(scriptInfo.mode && (scriptInfo.mode & 0o111))
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("builtins.path - works with toJSON", async () => {
    // Create a test file
    const tempDir = await Deno.makeTempDir()
    const testFile = `${tempDir}/test.txt`
    await Deno.writeTextFile(testFile, "Content for JSON")

    try {
        // Copy to store
        const result = await builtins.path({
            path: testFile
        })

        // toJSON should work on the result
        const json = await builtins.toJSON(result)

        // Should be a valid JSON string
        assertEquals(typeof json, "string")
        const parsed = JSON.parse(json)
        assertStringIncludes(parsed, "store")
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})
