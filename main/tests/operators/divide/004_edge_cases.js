#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.divide - Edge cases\n")

// Test 1: Division by 1
await test(
    1,
    "division by 1",
    '42 / 1',
    operators.divide(42n, 1n)
)

// Test 2: Same number division
await test(
    2,
    "same number",
    '5 / 5',
    operators.divide(5n, 5n)
)

// Test 3: Zero divided by something
await test(
    3,
    "zero divided",
    '0 / 100',
    operators.divide(0n, 100n)
)

// Test 4: Large number division
await test(
    4,
    "large numbers",
    '1000000 / 1000',
    operators.divide(1000000n, 1000n)
)

// Test 5: Integer truncation
await test(
    5,
    "truncation",
    '9 / 4',
    operators.divide(9n, 4n)
)

// Test 6: Float preventing truncation
await test(
    6,
    "float result",
    '9.0 / 4.0',
    operators.divide(9.0, 4.0)
)

// Test 7: Very small result
await test(
    7,
    "small result",
    '1.0 / 1000.0',
    operators.divide(1.0, 1000.0)
)

printSummary()
