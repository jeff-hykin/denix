#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.divide - Float division\n")

// Test 1: Float divided by float
await test(
    1,
    "10.0 / 2.0",
    '10.0 / 2.0',
    operators.divide(10.0, 2.0)
)

// Test 2: Float division with decimal result
await test(
    2,
    "7.0 / 2.0",
    '7.0 / 2.0',
    operators.divide(7.0, 2.0)
)

// Test 3: Int divided by float (converts to float)
await test(
    3,
    "10 / 2.0",
    '10 / 2.0',
    operators.divide(10n, 2.0)
)

// Test 4: Float divided by int (converts to float)
await test(
    4,
    "10.0 / 2",
    '10.0 / 2',
    operators.divide(10.0, 2n)
)

// Test 5: Small float division
await test(
    5,
    "1.5 / 0.5",
    '1.5 / 0.5',
    operators.divide(1.5, 0.5)
)

// Test 6: Negative float division
await test(
    6,
    "(-10.0) / 2.0",
    '(-10.0) / 2.0',
    operators.divide(-10.0, 2.0)
)

// Test 7: Precision test
await test(
    7,
    "3.14 / 2.0",
    '3.14 / 2.0',
    operators.divide(3.14, 2.0)
)

printSummary()
