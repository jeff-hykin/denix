#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.split - Intermediate tests\n")

// Test 1: Split with character class
await test(
    1,
    "split with character class",
    'builtins.split "[0-9]+" "abc123def456ghi"',
    builtins.split("[0-9]+")("abc123def456ghi")
)

// Test 2: Split with optional capture
await test(
    2,
    "split with optional group",
    'builtins.split "(x)?" "abcxdefxghi"',
    builtins.split("(x)?")("abcxdefxghi")
)

// Test 3: Split with word boundaries
await test(
    3,
    "split on word characters",
    'builtins.split "\\\\w+" "hello, world! 123"',
    builtins.split("\\w+")("hello, world! 123")
)

// Test 4: Split with alternation
await test(
    4,
    "split with alternation pattern",
    'builtins.split "(cat|dog)" "I have a cat and a dog"',
    builtins.split("(cat|dog)")("I have a cat and a dog")
)

// Test 5: Split with quantifiers
await test(
    5,
    "split with various quantifiers",
    'builtins.split "a+" "baaacaaaadbaaef"',
    builtins.split("a+")("baaacaaaadbaaef")
)

// Test 6: Split preserving multiple captures
await test(
    6,
    "split with multiple complex captures",
    'builtins.split "([a-z]+)([0-9]+)" "abc123def456"',
    builtins.split("([a-z]+)([0-9]+)")("abc123def456")
)

// Test 7: Split on special regex chars (escaped)
await test(
    7,
    "split on literal special characters",
    'builtins.split "\\\\+" "a+b+c"',
    builtins.split("\\+")("a+b+c")
)

// Test 8: Split with anchors in middle (won't match at start/end)
await test(
    8,
    "split with non-matching pattern",
    'builtins.split "^x" "abc"',
    builtins.split("^x")("abc")
)

// Test 9: Split with empty matches between characters
await test(
    9,
    "split on empty pattern boundaries",
    'builtins.split "()" "abc"',
    builtins.split("()")("abc")
)

// Test 10: Split with nested groups
await test(
    10,
    "split with nested capture groups",
    'builtins.split "((a)(b))" "xabxabx"',
    builtins.split("((a)(b))")("xabxabx")
)

printSummary()
