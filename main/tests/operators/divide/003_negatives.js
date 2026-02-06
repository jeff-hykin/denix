#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.divide - Negative numbers\n")

// Test 1: Negative / Positive
await test(
    1,
    "(-10) / 2",
    '(-10) / 2',
    operators.divide(-10n, 2n)
)

// Test 2: Positive / Negative
await test(
    2,
    "10 / (-2)",
    '10 / (-2)',
    operators.divide(10n, -2n)
)

// Test 3: Negative / Negative
await test(
    3,
    "(-10) / (-2)",
    '(-10) / (-2)',
    operators.divide(-10n, -2n)
)

// Test 4: Zero divided by negative
await test(
    4,
    "0 / (-5)",
    '0 / (-5)',
    operators.divide(0n, -5n)
)

// Test 5: Negative float division
await test(
    5,
    "(-7.5) / 2.5",
    '(-7.5) / 2.5',
    operators.divide(-7.5, 2.5)
)

// Test 6: Large negative division
await test(
    6,
    "(-100) / 10",
    '(-100) / 10',
    operators.divide(-100n, 10n)
)

printSummary()
