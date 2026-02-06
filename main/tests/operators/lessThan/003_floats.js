#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThan - Floats\n")

// Test 1: Float < Float (true)
await test(
    1,
    "2.5 < 3.5",
    '2.5 < 3.5',
    operators.lessThan(2.5, 3.5)
)

// Test 2: Float < Float (false)
await test(
    2,
    "3.5 < 2.5",
    '3.5 < 2.5',
    operators.lessThan(3.5, 2.5)
)

// Test 3: Equal floats
await test(
    3,
    "equal floats",
    '3.14 < 3.14',
    operators.lessThan(3.14, 3.14)
)

// Test 4: Small difference
await test(
    4,
    "small float difference",
    '1.0 < 1.01',
    operators.lessThan(1.0, 1.01)
)

// Test 5: Negative floats
await test(
    5,
    "negative floats",
    '(-2.5) < (-1.5)',
    operators.lessThan(-2.5, -1.5)
)

// Test 6: Zero float
await test(
    6,
    "zero < float",
    '0.0 < 0.1',
    operators.lessThan(0.0, 0.1)
)

// Test 7: Large floats
await test(
    7,
    "large floats",
    '999.998 < 999.999',
    operators.lessThan(999.998, 999.999)
)

printSummary()
