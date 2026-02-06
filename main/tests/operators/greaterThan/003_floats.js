#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThan - Floats\n")

// Test 1: Float > Float (true)
await test(
    1,
    "3.5 > 2.5",
    '3.5 > 2.5',
    operators.greaterThan(3.5, 2.5)
)

// Test 2: Float > Float (false)
await test(
    2,
    "2.5 > 3.5",
    '2.5 > 3.5',
    operators.greaterThan(2.5, 3.5)
)

// Test 3: Equal floats
await test(
    3,
    "equal floats",
    '3.14 > 3.14',
    operators.greaterThan(3.14, 3.14)
)

// Test 4: Small difference
await test(
    4,
    "small float difference",
    '1.01 > 1.0',
    operators.greaterThan(1.01, 1.0)
)

// Test 5: Negative floats
await test(
    5,
    "negative floats",
    '(-1.5) > (-2.5)',
    operators.greaterThan(-1.5, -2.5)
)

// Test 6: Zero float
await test(
    6,
    "float > zero",
    '0.1 > 0.0',
    operators.greaterThan(0.1, 0.0)
)

// Test 7: Large floats
await test(
    7,
    "large floats",
    '999.999 > 999.998',
    operators.greaterThan(999.999, 999.998)
)

printSummary()
