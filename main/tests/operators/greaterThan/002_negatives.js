#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThan - Negative numbers\n")

// Test 1: Positive > Negative
await test(
    1,
    "positive > negative",
    '5 > (-3)',
    operators.greaterThan(5n, -3n)
)

// Test 2: Negative > Negative (true)
await test(
    2,
    "less negative > more negative",
    '(-3) > (-5)',
    operators.greaterThan(-3n, -5n)
)

// Test 3: Negative > Negative (false)
await test(
    3,
    "more negative > less negative",
    '(-5) > (-3)',
    operators.greaterThan(-5n, -3n)
)

// Test 4: Zero > Negative
await test(
    4,
    "zero > negative",
    '0 > (-1)',
    operators.greaterThan(0n, -1n)
)

// Test 5: Negative > Zero
await test(
    5,
    "negative > zero",
    '(-1) > 0',
    operators.greaterThan(-1n, 0n)
)

// Test 6: Equal negatives
await test(
    6,
    "equal negatives",
    '(-5) > (-5)',
    operators.greaterThan(-5n, -5n)
)

// Test 7: Large negatives
await test(
    7,
    "large negatives",
    '(-100) > (-1000)',
    operators.greaterThan(-100n, -1000n)
)

printSummary()
