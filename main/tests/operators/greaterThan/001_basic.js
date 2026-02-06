#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThan - Basic tests\n")

// Test 1: Greater - true
await test(
    1,
    "5 > 3 is true",
    '5 > 3',
    operators.greaterThan(5n, 3n)
)

// Test 2: Greater - false
await test(
    2,
    "3 > 5 is false",
    '3 > 5',
    operators.greaterThan(3n, 5n)
)

// Test 3: Equal values - false
await test(
    3,
    "5 > 5 is false",
    '5 > 5',
    operators.greaterThan(5n, 5n)
)

// Test 4: Large difference
await test(
    4,
    "large difference",
    '100 > 10',
    operators.greaterThan(100n, 10n)
)

// Test 5: Small difference
await test(
    5,
    "small difference",
    '11 > 10',
    operators.greaterThan(11n, 10n)
)

// Test 6: Zero comparison
await test(
    6,
    "positive > zero",
    '5 > 0',
    operators.greaterThan(5n, 0n)
)

// Test 7: Negative comparison
await test(
    7,
    "zero > negative",
    '0 > (-5)',
    operators.greaterThan(0n, -5n)
)

printSummary()
