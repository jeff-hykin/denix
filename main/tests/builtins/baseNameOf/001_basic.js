#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.baseNameOf - Basic tests\n")

// Test 1: Simple filename
await test(
    1,
    "basename of simple path",
    'builtins.baseNameOf "/usr/bin/ls"',
    builtins.baseNameOf("/usr/bin/ls")
)

// Test 2: Path with no directory
await test(
    2,
    "basename of filename only",
    'builtins.baseNameOf "file.txt"',
    builtins.baseNameOf("file.txt")
)

// Test 3: Root directory
await test(
    3,
    "basename of root",
    'builtins.baseNameOf "/"',
    builtins.baseNameOf("/")
)

// Test 4: Path with trailing slash
await test(
    4,
    "basename with trailing slash",
    'builtins.baseNameOf "/usr/bin/"',
    builtins.baseNameOf("/usr/bin/")
)

// Test 5: Current directory
await test(
    5,
    "basename of current directory",
    'builtins.baseNameOf "."',
    builtins.baseNameOf(".")
)

// Test 6: Parent directory
await test(
    6,
    "basename of parent directory",
    'builtins.baseNameOf ".."',
    builtins.baseNameOf("..")
)

// Test 7: Relative path
await test(
    7,
    "basename of relative path",
    'builtins.baseNameOf "foo/bar/baz.txt"',
    builtins.baseNameOf("foo/bar/baz.txt")
)

// Test 8: Path with extension
await test(
    8,
    "basename preserves extension",
    'builtins.baseNameOf "/path/to/file.tar.gz"',
    builtins.baseNameOf("/path/to/file.tar.gz")
)

// Test 9: Hidden file
await test(
    9,
    "basename of hidden file",
    'builtins.baseNameOf "/home/user/.bashrc"',
    builtins.baseNameOf("/home/user/.bashrc")
)

// Test 10: Complex nested path
await test(
    10,
    "basename of deeply nested path",
    'builtins.baseNameOf "/usr/local/share/doc/package/README.md"',
    builtins.baseNameOf("/usr/local/share/doc/package/README.md")
)

printSummary()
