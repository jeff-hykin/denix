#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.multiply - Negative numbers\n")

// Test 1: Negative * Positive
await test(
    1,
    "(-5) * 3",
    '(-5) * 3',
    operators.multiply(-5n, 3n)
)

// Test 2: Positive * Negative
await test(
    2,
    "5 * (-3)",
    '5 * (-3)',
    operators.multiply(5n, -3n)
)

// Test 3: Negative * Negative
await test(
    3,
    "(-5) * (-3)",
    '(-5) * (-3)',
    operators.multiply(-5n, -3n)
)

// Test 4: Negative * 0
await test(
    4,
    "(-10) * 0",
    '(-10) * 0',
    operators.multiply(-10n, 0n)
)

// Test 5: Negative * 1
await test(
    5,
    "(-10) * 1",
    '(-10) * 1',
    operators.multiply(-10n, 1n)
)

// Test 6: Negative float multiplication
await test(
    6,
    "(-2.5) * (-2.0)",
    '(-2.5) * (-2.0)',
    operators.multiply(-2.5, -2.0)
)

// Test 7: Large negative multiplication
await test(
    7,
    "(-100) * 10",
    '(-100) * 10',
    operators.multiply(-100n, 10n)
)

printSummary()
