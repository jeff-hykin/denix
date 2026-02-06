#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.baseNameOf - Intermediate tests\n")

// Test 1: Multiple trailing slashes
await test(
    1,
    "basename with multiple trailing slashes",
    'builtins.baseNameOf "/usr/bin///"',
    builtins.baseNameOf("/usr/bin///")
)

// Test 2: Relative path with parent references
await test(
    2,
    "basename with parent directory references",
    'builtins.baseNameOf "../../../file.txt"',
    builtins.baseNameOf("../../../file.txt")
)

// Test 3: Path with spaces
await test(
    3,
    "basename of path with spaces",
    'builtins.baseNameOf "/path/to/my file.txt"',
    builtins.baseNameOf("/path/to/my file.txt")
)

// Test 4: Path with multiple dots
await test(
    4,
    "basename with multiple dots in filename",
    'builtins.baseNameOf "/path/to/file.tar.gz.backup"',
    builtins.baseNameOf("/path/to/file.tar.gz.backup")
)

// Test 5: Just a dot (current directory)
await test(
    5,
    "basename of just a dot",
    'builtins.baseNameOf "."',
    builtins.baseNameOf(".")
)

// Test 6: Just two dots (parent directory)
await test(
    6,
    "basename of just double dots",
    'builtins.baseNameOf ".."',
    builtins.baseNameOf("..")
)

// Test 7: Hidden directory
await test(
    7,
    "basename of hidden directory path",
    'builtins.baseNameOf "/home/user/.config"',
    builtins.baseNameOf("/home/user/.config")
)

// Test 8: Path with no extension
await test(
    8,
    "basename of file with no extension",
    'builtins.baseNameOf "/usr/local/bin/myprogram"',
    builtins.baseNameOf("/usr/local/bin/myprogram")
)

// Test 9: Only extension (hidden file)
await test(
    9,
    "basename of file that is only extension",
    'builtins.baseNameOf "/path/.gitignore"',
    builtins.baseNameOf("/path/.gitignore")
)

// Test 10: Complex path with mixed separators
await test(
    10,
    "basename of path with dot directories",
    'builtins.baseNameOf "/home/./user/../user/file.txt"',
    builtins.baseNameOf("/home/./user/../user/file.txt")
)

printSummary()
