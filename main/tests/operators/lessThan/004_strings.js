#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThan - Strings (lexicographic)\n")

// Test 1: Lexicographic comparison (true)
await test(
    1,
    "a < b",
    '"a" < "b"',
    operators.lessThan("a", "b")
)

// Test 2: Lexicographic comparison (false)
await test(
    2,
    "b < a",
    '"b" < "a"',
    operators.lessThan("b", "a")
)

// Test 3: Equal strings
await test(
    3,
    "equal strings",
    '"hello" < "hello"',
    operators.lessThan("hello", "hello")
)

// Test 4: Prefix comparison
await test(
    4,
    "prefix < longer",
    '"hell" < "hello"',
    operators.lessThan("hell", "hello")
)

// Test 5: Case sensitivity
await test(
    5,
    "lowercase vs uppercase",
    '"a" < "A"',
    operators.lessThan("a", "A")
)

// Test 6: Empty string
await test(
    6,
    "empty < non-empty",
    '"" < "a"',
    operators.lessThan("", "a")
)

// Test 7: Numbers as strings
await test(
    7,
    "string numbers",
    '"10" < "2"',
    operators.lessThan("10", "2")
)

printSummary()
