#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.dirOf - Basic tests\n")

// Test 1: Simple path
await test(
    1,
    "directory of simple path",
    'builtins.dirOf "/usr/bin/ls"',
    builtins.dirOf("/usr/bin/ls")
)

// Test 2: Root level file
await test(
    2,
    "directory of root level file",
    'builtins.dirOf "/file.txt"',
    builtins.dirOf("/file.txt")
)

// Test 3: Root directory
await test(
    3,
    "directory of root",
    'builtins.dirOf "/"',
    builtins.dirOf("/")
)

// Test 4: Current directory file
await test(
    4,
    "directory of file in current dir",
    'builtins.dirOf "file.txt"',
    builtins.dirOf("file.txt")
)

// Test 5: Relative path
await test(
    5,
    "directory of relative path",
    'builtins.dirOf "foo/bar/baz.txt"',
    builtins.dirOf("foo/bar/baz.txt")
)

// Test 6: Path with trailing slash
await test(
    6,
    "directory with trailing slash",
    'builtins.dirOf "/usr/bin/"',
    builtins.dirOf("/usr/bin/")
)

// Test 7: Current directory marker
await test(
    7,
    "directory of current directory",
    'builtins.dirOf "."',
    builtins.dirOf(".")
)

// Test 8: Parent directory marker
await test(
    8,
    "directory of parent directory",
    'builtins.dirOf ".."',
    builtins.dirOf("..")
)

// Test 9: Deeply nested path
await test(
    9,
    "directory of deeply nested path",
    'builtins.dirOf "/usr/local/share/doc/package/README.md"',
    builtins.dirOf("/usr/local/share/doc/package/README.md")
)

// Test 10: Hidden directory
await test(
    10,
    "directory containing hidden file",
    'builtins.dirOf "/home/user/.config/app/settings.json"',
    builtins.dirOf("/home/user/.config/app/settings.json")
)

printSummary()
