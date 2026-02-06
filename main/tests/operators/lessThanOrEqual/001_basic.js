#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThanOrEqual - Basic tests\n")

// Test 1: Less - true
await test(
    1,
    "3 <= 5 is true",
    '3 <= 5',
    operators.lessThanOrEqual(3n, 5n)
)

// Test 2: Greater - false
await test(
    2,
    "5 <= 3 is false",
    '5 <= 3',
    operators.lessThanOrEqual(5n, 3n)
)

// Test 3: Equal - true
await test(
    3,
    "5 <= 5 is true",
    '5 <= 5',
    operators.lessThanOrEqual(5n, 5n)
)

// Test 4: Large difference
await test(
    4,
    "large difference",
    '10 <= 100',
    operators.lessThanOrEqual(10n, 100n)
)

// Test 5: Zero comparison
await test(
    5,
    "zero <= zero",
    '0 <= 0',
    operators.lessThanOrEqual(0n, 0n)
)

// Test 6: Negative numbers
await test(
    6,
    "negative <= zero",
    '(-5) <= 0',
    operators.lessThanOrEqual(-5n, 0n)
)

// Test 7: Equal negatives
await test(
    7,
    "equal negatives",
    '(-5) <= (-5)',
    operators.lessThanOrEqual(-5n, -5n)
)

printSummary()
