#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.divide - Basic tests\n")

// Test 1: Simple integer division
await test(
    1,
    "10 / 2",
    '10 / 2',
    operators.divide(10n, 2n)
)

// Test 2: Division with remainder (int/int truncates)
await test(
    2,
    "7 / 2",
    '7 / 2',
    operators.divide(7n, 2n)
)

// Test 3: Division by 1
await test(
    3,
    "5 / 1",
    '5 / 1',
    operators.divide(5n, 1n)
)

// Test 4: Division resulting in 0
await test(
    4,
    "0 / 5",
    '0 / 5',
    operators.divide(0n, 5n)
)

// Test 5: Larger numbers
await test(
    5,
    "100 / 10",
    '100 / 10',
    operators.divide(100n, 10n)
)

// Test 6: Negative divided by positive
await test(
    6,
    "(-10) / 2",
    '(-10) / 2',
    operators.divide(-10n, 2n)
)

// Test 7: Positive divided by negative
await test(
    7,
    "10 / (-2)",
    '10 / (-2)',
    operators.divide(10n, -2n)
)

printSummary()
