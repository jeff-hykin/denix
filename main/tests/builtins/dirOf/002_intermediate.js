#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.dirOf - Intermediate tests\n")

// Test 1: Multiple trailing slashes
await test(
    1,
    "directory with multiple trailing slashes",
    'builtins.dirOf "/usr/bin///"',
    builtins.dirOf("/usr/bin///")
)

// Test 2: Nested relative path
await test(
    2,
    "directory of nested relative path",
    'builtins.dirOf "a/b/c/d/e.txt"',
    builtins.dirOf("a/b/c/d/e.txt")
)

// Test 3: Path with spaces
await test(
    3,
    "directory of path with spaces",
    'builtins.dirOf "/path/to/my file.txt"',
    builtins.dirOf("/path/to/my file.txt")
)

// Test 4: Path with parent references
await test(
    4,
    "directory with parent directory references",
    'builtins.dirOf "../../../file.txt"',
    builtins.dirOf("../../../file.txt")
)

// Test 5: Complex hidden directory structure
await test(
    5,
    "directory of nested hidden directories",
    'builtins.dirOf "/home/user/.config/.hidden/.secret/file"',
    builtins.dirOf("/home/user/.config/.hidden/.secret/file")
)

// Test 6: Path ending with dot directory
await test(
    6,
    "directory ending with current directory marker",
    'builtins.dirOf "/usr/local/./bin"',
    builtins.dirOf("/usr/local/./bin")
)

// Test 7: Path with mixed slashes
await test(
    7,
    "directory with dot directories in path",
    'builtins.dirOf "/home/./user/../user/./file.txt"',
    builtins.dirOf("/home/./user/../user/./file.txt")
)

// Test 8: Long deeply nested path
await test(
    8,
    "directory of very deep path",
    'builtins.dirOf "/a/b/c/d/e/f/g/h/i/j/k/l/m/file.txt"',
    builtins.dirOf("/a/b/c/d/e/f/g/h/i/j/k/l/m/file.txt")
)

// Test 9: Path with only filename (no directory)
await test(
    9,
    "directory of bare filename",
    'builtins.dirOf "README.md"',
    builtins.dirOf("README.md")
)

// Test 10: Path with special characters
await test(
    10,
    "directory with special characters in path",
    'builtins.dirOf "/path/with-dashes/and_underscores/file.txt"',
    builtins.dirOf("/path/with-dashes/and_underscores/file.txt")
)

printSummary()
