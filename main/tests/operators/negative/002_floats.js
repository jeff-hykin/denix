#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negative - Float values\n")

// Test 1: Small positive float
await test(
    1,
    "small positive float",
    '-(0.001)',
    operators.negative(0.001)
)

// Test 2: Small negative float
await test(
    2,
    "small negative float",
    '-(-0.001)',
    operators.negative(-0.001)
)

// Test 3: Large positive float
await test(
    3,
    "large positive float",
    '-(999999.999)',
    operators.negative(999999.999)
)

// Test 4: Large negative float
await test(
    4,
    "large negative float",
    '-(-999999.999)',
    operators.negative(-999999.999)
)

// Test 5: Float with many decimals
await test(
    5,
    "precise float",
    '-(1.23456789)',
    operators.negative(1.23456789)
)

// Test 6: Scientific notation-like values
await test(
    6,
    "very small float",
    '-(0.000001)',
    operators.negative(0.000001)
)

printSummary()
