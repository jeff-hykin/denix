#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThan - Strings (lexicographic)\n")

// Test 1: Lexicographic comparison (true)
await test(
    1,
    "b > a",
    '"b" > "a"',
    operators.greaterThan("b", "a")
)

// Test 2: Lexicographic comparison (false)
await test(
    2,
    "a > b",
    '"a" > "b"',
    operators.greaterThan("a", "b")
)

// Test 3: Equal strings
await test(
    3,
    "equal strings",
    '"hello" > "hello"',
    operators.greaterThan("hello", "hello")
)

// Test 4: Prefix comparison
await test(
    4,
    "longer prefix",
    '"hello" > "hell"',
    operators.greaterThan("hello", "hell")
)

// Test 5: Case sensitivity
await test(
    5,
    "uppercase vs lowercase",
    '"A" > "a"',
    operators.greaterThan("A", "a")
)

// Test 6: Empty string
await test(
    6,
    "non-empty > empty",
    '"a" > ""',
    operators.greaterThan("a", "")
)

// Test 7: Numbers as strings
await test(
    7,
    "string numbers",
    '"2" > "10"',
    operators.greaterThan("2", "10")
)

printSummary()
