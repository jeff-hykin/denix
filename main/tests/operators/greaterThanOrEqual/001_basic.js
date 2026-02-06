#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThanOrEqual - Basic tests\n")

// Test 1: Greater - true
await test(
    1,
    "5 >= 3 is true",
    '5 >= 3',
    operators.greaterThanOrEqual(5n, 3n)
)

// Test 2: Less - false
await test(
    2,
    "3 >= 5 is false",
    '3 >= 5',
    operators.greaterThanOrEqual(3n, 5n)
)

// Test 3: Equal - true
await test(
    3,
    "5 >= 5 is true",
    '5 >= 5',
    operators.greaterThanOrEqual(5n, 5n)
)

// Test 4: Large difference
await test(
    4,
    "large difference",
    '100 >= 10',
    operators.greaterThanOrEqual(100n, 10n)
)

// Test 5: Zero comparison
await test(
    5,
    "zero >= zero",
    '0 >= 0',
    operators.greaterThanOrEqual(0n, 0n)
)

// Test 6: Negative numbers
await test(
    6,
    "zero >= negative",
    '0 >= (-5)',
    operators.greaterThanOrEqual(0n, -5n)
)

// Test 7: Equal negatives
await test(
    7,
    "equal negatives",
    '(-5) >= (-5)',
    operators.greaterThanOrEqual(-5n, -5n)
)

printSummary()
