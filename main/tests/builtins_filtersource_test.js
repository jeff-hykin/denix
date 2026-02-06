// Test builtins.filterSource
import { assertEquals, assert, assertStringIncludes } from "jsr:@std/assert"
import { createRuntime } from "../runtime.js"

const runtime = createRuntime()
const builtins = runtime.scopeStack[0].builtins

Deno.test("filterSource - filters out specific files", async () => {
    // Create a test directory with multiple files
    const tempDir = await Deno.makeTempDir()
    await Deno.writeTextFile(`${tempDir}/README.md`, "# Project")
    await Deno.writeTextFile(`${tempDir}/source.js`, "console.log('code')")
    await Deno.writeTextFile(`${tempDir}/build.log`, "build output")
    await Deno.writeTextFile(`${tempDir}/.gitignore`, "*.log")

    try {
        // Filter out .log and .gitignore files
        const filterFn = (path) => (type) => {
            return !path.endsWith(".log") && !path.endsWith(".gitignore")
        }

        const result = await builtins.filterSource(filterFn)(tempDir)

        // Should return a Path object
        assert(result.constructor.name === "Path")
        const storePath = result.toString()
        assertStringIncludes(storePath, "store")

        // Check which files made it through
        const files = []
        for await (const entry of Deno.readDir(storePath)) {
            files.push(entry.name)
        }

        assert(files.includes("README.md"))
        assert(files.includes("source.js"))
        assert(!files.includes("build.log"))
        assert(!files.includes(".gitignore"))
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("filterSource - filters by file type", async () => {
    // Create a test directory with files and subdirectories
    const tempDir = await Deno.makeTempDir()
    await Deno.writeTextFile(`${tempDir}/file.txt`, "content")
    await Deno.mkdir(`${tempDir}/subdir`)
    await Deno.writeTextFile(`${tempDir}/subdir/nested.txt`, "nested content")

    try {
        // Only keep regular files (exclude directories)
        const filterFn = (path) => (type) => {
            return type !== "directory" || path === tempDir || path.endsWith("subdir")
        }

        const result = await builtins.filterSource(filterFn)(tempDir)

        // Should succeed and return a Path
        assert(result.constructor.name === "Path")
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("filterSource - curried function application", async () => {
    // Create a simple test directory
    const tempDir = await Deno.makeTempDir()
    await Deno.writeTextFile(`${tempDir}/keep.txt`, "keep this")
    await Deno.writeTextFile(`${tempDir}/remove.tmp`, "remove this")

    try {
        // filterSource is curried: filter -> path -> result
        const filterFn = (path) => (type) => !path.endsWith(".tmp")

        // Apply filter function first
        const filteredSource = builtins.filterSource(filterFn)

        // Then apply path
        const result = await filteredSource(tempDir)

        // Should work correctly
        assert(result.constructor.name === "Path")

        const files = []
        for await (const entry of Deno.readDir(result.toString())) {
            files.push(entry.name)
        }

        assert(files.includes("keep.txt"))
        assert(!files.includes("remove.tmp"))
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("filterSource - keeps all files when filter returns true", async () => {
    // Create test files
    const tempDir = await Deno.makeTempDir()
    await Deno.writeTextFile(`${tempDir}/file1.txt`, "content 1")
    await Deno.writeTextFile(`${tempDir}/file2.txt`, "content 2")

    try {
        // Filter that keeps everything
        const filterFn = (path) => (type) => true

        const result = await builtins.filterSource(filterFn)(tempDir)

        const files = []
        for await (const entry of Deno.readDir(result.toString())) {
            files.push(entry.name)
        }

        assert(files.includes("file1.txt"))
        assert(files.includes("file2.txt"))
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("filterSource - removes all files when filter returns false", async () => {
    // Create test files
    const tempDir = await Deno.makeTempDir()
    await Deno.writeTextFile(`${tempDir}/file1.txt`, "content 1")
    await Deno.writeTextFile(`${tempDir}/file2.txt`, "content 2")

    try {
        // Filter that rejects everything except the root directory
        const filterFn = (path) => (type) => path === tempDir && type === "directory"

        const result = await builtins.filterSource(filterFn)(tempDir)

        // Directory should exist but might be empty
        const storePath = result.toString()
        const storeInfo = await Deno.stat(storePath)
        assert(storeInfo.isDirectory)

        const files = []
        for await (const entry of Deno.readDir(storePath)) {
            files.push(entry.name)
        }

        // No regular files should remain
        assertEquals(files.length, 0)
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})

Deno.test("filterSource - works with toJSON", async () => {
    // Create a simple test directory
    const tempDir = await Deno.makeTempDir()
    await Deno.writeTextFile(`${tempDir}/file.txt`, "content")

    try {
        const filterFn = (path) => (type) => true
        const result = await builtins.filterSource(filterFn)(tempDir)

        // toJSON should work
        const json = await builtins.toJSON(result)

        assertEquals(typeof json, "string")
        const parsed = JSON.parse(json)
        assertStringIncludes(parsed, "store")
    } finally {
        // Clean up
        try { await Deno.remove(tempDir, { recursive: true }) } catch {}
    }
})
