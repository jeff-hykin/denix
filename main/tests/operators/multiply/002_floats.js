#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.multiply - Float multiplication\n")

// Test 1: Float times float
await test(
    1,
    "3.5 * 2.0",
    '3.5 * 2.0',
    operators.multiply(3.5, 2.0)
)

// Test 2: Int times float (converts to float)
await test(
    2,
    "5 * 2.5",
    '5 * 2.5',
    operators.multiply(5n, 2.5)
)

// Test 3: Float times int (converts to float)
await test(
    3,
    "2.5 * 4",
    '2.5 * 4',
    operators.multiply(2.5, 4n)
)

// Test 4: Decimal precision
await test(
    4,
    "precision test",
    '3.14 * 2.0',
    operators.multiply(3.14, 2.0)
)

// Test 5: Small floats
await test(
    5,
    "small floats",
    '0.5 * 0.5',
    operators.multiply(0.5, 0.5)
)

// Test 6: Negative float multiplication
await test(
    6,
    "negative float",
    '(-2.5) * 4.0',
    operators.multiply(-2.5, 4.0)
)

// Test 7: Float with zero
await test(
    7,
    "float * zero",
    '3.14 * 0.0',
    operators.multiply(3.14, 0.0)
)

printSummary()
