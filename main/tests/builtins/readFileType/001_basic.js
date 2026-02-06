#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.readFileType - Basic tests\n")

// Create temporary test files
const testDir = `/tmp/denix_readfiletype_test_${Date.now()}`
await FileSystem.ensureDir(testDir)
const testFile = `${testDir}/test.txt`
const testSubdir = `${testDir}/subdir`

await FileSystem.write({ path: testFile, text: "test content" })
await FileSystem.ensureDir(testSubdir)

try {
    // Test 1: Regular file
    await test(
        1,
        "read file type - regular file",
        `builtins.readFileType "${testFile}"`,
        builtins.readFileType(testFile)
    )

    // Test 2: Directory
    await test(
        2,
        "read file type - directory",
        `builtins.readFileType "${testSubdir}"`,
        builtins.readFileType(testSubdir)
    )

    // Test 3: Another regular file
    const anotherFile = `${testDir}/another.js`
    await FileSystem.write({ path: anotherFile, text: "// code" })
    await test(
        3,
        "read file type - JS file",
        `builtins.readFileType "${anotherFile}"`,
        builtins.readFileType(anotherFile)
    )

    // Test 4: Nested directory
    const nestedDir = `${testSubdir}/nested`
    await FileSystem.ensureDir(nestedDir)
    await test(
        4,
        "read file type - nested directory",
        `builtins.readFileType "${nestedDir}"`,
        builtins.readFileType(nestedDir)
    )

    // Test 5: Empty file
    const emptyFile = `${testDir}/empty.txt`
    await FileSystem.write({ path: emptyFile, text: "" })
    await test(
        5,
        "read file type - empty file",
        `builtins.readFileType "${emptyFile}"`,
        builtins.readFileType(emptyFile)
    )

} finally {
    // Cleanup
    await FileSystem.remove(testDir)
}

printSummary()
