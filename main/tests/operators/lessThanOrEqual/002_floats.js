#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThanOrEqual - Floats\n")

// Test 1: Float <= Float (less)
await test(
    1,
    "2.5 <= 3.5",
    '2.5 <= 3.5',
    operators.lessThanOrEqual(2.5, 3.5)
)

// Test 2: Float <= Float (greater)
await test(
    2,
    "3.5 <= 2.5",
    '3.5 <= 2.5',
    operators.lessThanOrEqual(3.5, 2.5)
)

// Test 3: Equal floats
await test(
    3,
    "equal floats",
    '3.14 <= 3.14',
    operators.lessThanOrEqual(3.14, 3.14)
)

// Test 4: Negative floats (less)
await test(
    4,
    "negative floats",
    '(-2.5) <= (-1.5)',
    operators.lessThanOrEqual(-2.5, -1.5)
)

// Test 5: Negative floats (equal)
await test(
    5,
    "equal negative floats",
    '(-1.5) <= (-1.5)',
    operators.lessThanOrEqual(-1.5, -1.5)
)

// Test 6: Zero float
await test(
    6,
    "zero <= zero float",
    '0.0 <= 0.0',
    operators.lessThanOrEqual(0.0, 0.0)
)

printSummary()
