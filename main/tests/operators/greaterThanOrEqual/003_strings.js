#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThanOrEqual - Strings\n")

// Test 1: Lexicographic (greater)
await test(
    1,
    "b >= a",
    '"b" >= "a"',
    operators.greaterThanOrEqual("b", "a")
)

// Test 2: Lexicographic (less)
await test(
    2,
    "a >= b",
    '"a" >= "b"',
    operators.greaterThanOrEqual("a", "b")
)

// Test 3: Equal strings
await test(
    3,
    "equal strings",
    '"hello" >= "hello"',
    operators.greaterThanOrEqual("hello", "hello")
)

// Test 4: Prefix comparison
await test(
    4,
    "longer >= prefix",
    '"hello" >= "hell"',
    operators.greaterThanOrEqual("hello", "hell")
)

// Test 5: Empty strings
await test(
    5,
    "empty >= empty",
    '"" >= ""',
    operators.greaterThanOrEqual("", "")
)

// Test 6: Non-empty >= empty
await test(
    6,
    "non-empty >= empty",
    '"a" >= ""',
    operators.greaterThanOrEqual("a", "")
)

printSummary()
