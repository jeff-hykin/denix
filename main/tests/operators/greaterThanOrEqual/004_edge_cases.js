#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThanOrEqual - Edge cases\n")

// Test 1: Boundary with zero
await test(
    1,
    "1 >= 0",
    '1 >= 0',
    operators.greaterThanOrEqual(1n, 0n)
)

// Test 2: Boundary with zero (equal)
await test(
    2,
    "0 >= 0",
    '0 >= 0',
    operators.greaterThanOrEqual(0n, 0n)
)

// Test 3: Just above threshold
await test(
    3,
    "just above",
    '11 >= 10',
    operators.greaterThanOrEqual(11n, 10n)
)

// Test 4: At threshold
await test(
    4,
    "at threshold",
    '10 >= 10',
    operators.greaterThanOrEqual(10n, 10n)
)

// Test 5: Just below threshold
await test(
    5,
    "just below",
    '9 >= 10',
    operators.greaterThanOrEqual(9n, 10n)
)

// Test 6: Large numbers equal
await test(
    6,
    "large numbers equal",
    '999999 >= 999999',
    operators.greaterThanOrEqual(999999n, 999999n)
)

// Test 7: Large numbers different
await test(
    7,
    "large numbers different",
    '1000000 >= 999999',
    operators.greaterThanOrEqual(1000000n, 999999n)
)

printSummary()
