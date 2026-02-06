#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThanOrEqual - Floats\n")

// Test 1: Float >= Float (greater)
await test(
    1,
    "3.5 >= 2.5",
    '3.5 >= 2.5',
    operators.greaterThanOrEqual(3.5, 2.5)
)

// Test 2: Float >= Float (less)
await test(
    2,
    "2.5 >= 3.5",
    '2.5 >= 3.5',
    operators.greaterThanOrEqual(2.5, 3.5)
)

// Test 3: Equal floats
await test(
    3,
    "equal floats",
    '3.14 >= 3.14',
    operators.greaterThanOrEqual(3.14, 3.14)
)

// Test 4: Negative floats (greater)
await test(
    4,
    "negative floats",
    '(-1.5) >= (-2.5)',
    operators.greaterThanOrEqual(-1.5, -2.5)
)

// Test 5: Negative floats (equal)
await test(
    5,
    "equal negative floats",
    '(-1.5) >= (-1.5)',
    operators.greaterThanOrEqual(-1.5, -1.5)
)

// Test 6: Zero float
await test(
    6,
    "zero >= zero float",
    '0.0 >= 0.0',
    operators.greaterThanOrEqual(0.0, 0.0)
)

printSummary()
