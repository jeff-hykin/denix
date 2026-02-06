#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThan - Basic tests\n")

// Test 1: Less - true
await test(
    1,
    "3 < 5 is true",
    '3 < 5',
    operators.lessThan(3n, 5n)
)

// Test 2: Greater - false
await test(
    2,
    "5 < 3 is false",
    '5 < 3',
    operators.lessThan(5n, 3n)
)

// Test 3: Equal values - false
await test(
    3,
    "5 < 5 is false",
    '5 < 5',
    operators.lessThan(5n, 5n)
)

// Test 4: Large difference
await test(
    4,
    "large difference",
    '10 < 100',
    operators.lessThan(10n, 100n)
)

// Test 5: Small difference
await test(
    5,
    "small difference",
    '10 < 11',
    operators.lessThan(10n, 11n)
)

// Test 6: Zero comparison
await test(
    6,
    "zero < positive",
    '0 < 5',
    operators.lessThan(0n, 5n)
)

// Test 7: Negative comparison
await test(
    7,
    "negative < zero",
    '(-5) < 0',
    operators.lessThan(-5n, 0n)
)

printSummary()
