#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negative - Basic tests\n")

// Test 1: Negate positive integer
await test(
    1,
    "negate positive integer",
    '-(5)',
    operators.negative(5n)
)

// Test 2: Negate negative integer
await test(
    2,
    "negate negative integer",
    '-(-5)',
    operators.negative(-5n)
)

// Test 3: Negate zero
await test(
    3,
    "negate zero",
    '-(0)',
    operators.negative(0n)
)

// Test 4: Negate positive float
await test(
    4,
    "negate positive float",
    '-(3.14)',
    operators.negative(3.14)
)

// Test 5: Negate negative float
await test(
    5,
    "negate negative float",
    '-(-2.5)',
    operators.negative(-2.5)
)

// Test 6: Negate zero float
await test(
    6,
    "negate zero float",
    '-(0.0)',
    operators.negative(0.0)
)

// Test 7: Large integer
await test(
    7,
    "negate large integer",
    '-(1000000)',
    operators.negative(1000000n)
)

printSummary()
