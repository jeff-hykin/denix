#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negative - Integer values\n")

// Test 1: Single digit positive
await test(
    1,
    "single digit positive",
    '-(1)',
    operators.negative(1n)
)

// Test 2: Single digit negative
await test(
    2,
    "single digit negative",
    '-(-1)',
    operators.negative(-1n)
)

// Test 3: Two digit positive
await test(
    3,
    "two digit positive",
    '-(42)',
    operators.negative(42n)
)

// Test 4: Two digit negative
await test(
    4,
    "two digit negative",
    '-(-42)',
    operators.negative(-42n)
)

// Test 5: Large positive integer
await test(
    5,
    "large positive",
    '-(123456)',
    operators.negative(123456n)
)

// Test 6: Large negative integer
await test(
    6,
    "large negative",
    '-(-123456)',
    operators.negative(-123456n)
)

// Test 7: Very large integer
await test(
    7,
    "very large integer",
    '-(999999999)',
    operators.negative(999999999n)
)

printSummary()
