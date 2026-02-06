#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThanOrEqual - Edge cases\n")

// Test 1: Boundary with zero
await test(
    1,
    "0 <= 1",
    '0 <= 1',
    operators.lessThanOrEqual(0n, 1n)
)

// Test 2: Boundary with zero (equal)
await test(
    2,
    "0 <= 0",
    '0 <= 0',
    operators.lessThanOrEqual(0n, 0n)
)

// Test 3: Just below threshold
await test(
    3,
    "just below",
    '9 <= 10',
    operators.lessThanOrEqual(9n, 10n)
)

// Test 4: At threshold
await test(
    4,
    "at threshold",
    '10 <= 10',
    operators.lessThanOrEqual(10n, 10n)
)

// Test 5: Just above threshold
await test(
    5,
    "just above",
    '11 <= 10',
    operators.lessThanOrEqual(11n, 10n)
)

// Test 6: Large numbers equal
await test(
    6,
    "large numbers equal",
    '999999 <= 999999',
    operators.lessThanOrEqual(999999n, 999999n)
)

// Test 7: Large numbers different
await test(
    7,
    "large numbers different",
    '999999 <= 1000000',
    operators.lessThanOrEqual(999999n, 1000000n)
)

printSummary()
