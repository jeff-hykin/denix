#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.split - Basic tests\n")

// Test 1: Simple split with no captures
await test(
    1,
    "split with simple regex, no captures",
    'builtins.split "," "a,b,c"',
    builtins.split(",")("a,b,c")
)

// Test 2: Split with single capture group
await test(
    2,
    "split with single capture group",
    'builtins.split "([a-z]+)" "foo1bar2baz"',
    builtins.split("([a-z]+)")("foo1bar2baz")
)

// Test 3: Empty string
await test(
    3,
    "split empty string",
    'builtins.split "," ""',
    builtins.split(",")("")
)

// Test 4: No matches
await test(
    4,
    "split with no matches",
    'builtins.split "x" "abc"',
    builtins.split("x")("abc")
)

// Test 5: Split at start
await test(
    5,
    "split when match is at start",
    'builtins.split "," ",a,b"',
    builtins.split(",")(",a,b")
)

// Test 6: Split at end
await test(
    6,
    "split when match is at end",
    'builtins.split "," "a,b,"',
    builtins.split(",")("a,b,")
)

// Test 7: Multiple capture groups
await test(
    7,
    "split with multiple capture groups",
    'builtins.split "([0-9])([a-z])" "1a2b3c"',
    builtins.split("([0-9])([a-z])")("1a2b3c")
)

// Test 8: Split with whitespace regex
await test(
    8,
    "split on whitespace",
    'builtins.split " +" "hello  world   foo"',
    builtins.split(" +")("hello  world   foo")
)

// Test 9: Split with dot (literal dot)
await test(
    9,
    "split on literal dot",
    'builtins.split "\\\\." "a.b.c"',
    builtins.split("\\.")("a.b.c")
)

// Test 10: Consecutive matches
await test(
    10,
    "split with consecutive matches",
    'builtins.split "," "a,,b,,,c"',
    builtins.split(",")("a,,b,,,c")
)

printSummary()
