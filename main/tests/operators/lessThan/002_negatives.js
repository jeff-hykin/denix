#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThan - Negative numbers\n")

// Test 1: Negative < Positive
await test(
    1,
    "negative < positive",
    '(-3) < 5',
    operators.lessThan(-3n, 5n)
)

// Test 2: Negative < Negative (true)
await test(
    2,
    "more negative < less negative",
    '(-5) < (-3)',
    operators.lessThan(-5n, -3n)
)

// Test 3: Negative < Negative (false)
await test(
    3,
    "less negative < more negative",
    '(-3) < (-5)',
    operators.lessThan(-3n, -5n)
)

// Test 4: Negative < Zero
await test(
    4,
    "negative < zero",
    '(-1) < 0',
    operators.lessThan(-1n, 0n)
)

// Test 5: Zero < Negative
await test(
    5,
    "zero < negative",
    '0 < (-1)',
    operators.lessThan(0n, -1n)
)

// Test 6: Equal negatives
await test(
    6,
    "equal negatives",
    '(-5) < (-5)',
    operators.lessThan(-5n, -5n)
)

// Test 7: Large negatives
await test(
    7,
    "large negatives",
    '(-1000) < (-100)',
    operators.lessThan(-1000n, -100n)
)

printSummary()
