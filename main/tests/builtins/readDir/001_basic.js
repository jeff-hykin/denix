#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.readDir - Basic tests\n")

// Create a temporary test directory structure
const testDir = `/tmp/denix_readdir_test_${Date.now()}`
await FileSystem.ensureDir(testDir)
await FileSystem.ensureDir(`${testDir}/subdir`)
await FileSystem.write({ path: `${testDir}/file.txt`, text: "test" })
await FileSystem.write({ path: `${testDir}/another.js`, text: "// test" })

try {
    // Test 1: Read directory with files and subdirs
    await test(
        1,
        "read directory contents",
        `builtins.readDir "${testDir}"`,
        builtins.readDir(testDir)
    )

    // Test 2: Read empty directory
    const emptyDir = `${testDir}/empty`
    await FileSystem.ensureDir(emptyDir)
    await test(
        2,
        "read empty directory",
        `builtins.readDir "${emptyDir}"`,
        builtins.readDir(emptyDir)
    )

    // Test 3: Read directory with only files
    const filesOnlyDir = `${testDir}/files_only`
    await FileSystem.ensureDir(filesOnlyDir)
    await FileSystem.write({ path: `${filesOnlyDir}/a.txt`, text: "a" })
    await FileSystem.write({ path: `${filesOnlyDir}/b.txt`, text: "b" })
    await test(
        3,
        "directory with only files",
        `builtins.readDir "${filesOnlyDir}"`,
        builtins.readDir(filesOnlyDir)
    )

    // Test 4: Read directory with only subdirs
    const dirsOnlyDir = `${testDir}/dirs_only`
    await FileSystem.ensureDir(dirsOnlyDir)
    await FileSystem.ensureDir(`${dirsOnlyDir}/dir1`)
    await FileSystem.ensureDir(`${dirsOnlyDir}/dir2`)
    await test(
        4,
        "directory with only subdirs",
        `builtins.readDir "${dirsOnlyDir}"`,
        builtins.readDir(dirsOnlyDir)
    )

} finally {
    // Cleanup
    await FileSystem.remove(testDir)
}

printSummary()
