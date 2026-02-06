#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.multiply - Basic tests\n")

// Test 1: Simple multiplication
await test(
    1,
    "5 * 3",
    '5 * 3',
    operators.multiply(5n, 3n)
)

// Test 2: Multiply by 1
await test(
    2,
    "multiply by 1",
    '10 * 1',
    operators.multiply(10n, 1n)
)

// Test 3: Multiply by 0
await test(
    3,
    "multiply by 0",
    '10 * 0',
    operators.multiply(10n, 0n)
)

// Test 4: Larger numbers
await test(
    4,
    "larger numbers",
    '100 * 50',
    operators.multiply(100n, 50n)
)

// Test 5: Small numbers
await test(
    5,
    "small numbers",
    '2 * 2',
    operators.multiply(2n, 2n)
)

// Test 6: Negative times positive
await test(
    6,
    "negative * positive",
    '(-5) * 3',
    operators.multiply(-5n, 3n)
)

// Test 7: Positive times negative
await test(
    7,
    "positive * negative",
    '5 * (-3)',
    operators.multiply(5n, -3n)
)

printSummary()
