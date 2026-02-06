#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.notEqual - Basic tests\n")

// Test 1: Different integers
await test(
    1,
    "different integers",
    '5 != 3',
    operators.notEqual(5n, 3n)
)

// Test 2: Same integers
await test(
    2,
    "same integers",
    '5 != 5',
    operators.notEqual(5n, 5n)
)

// Test 3: Different strings
await test(
    3,
    "different strings",
    '"hello" != "world"',
    operators.notEqual("hello", "world")
)

// Test 4: Same strings
await test(
    4,
    "same strings",
    '"hello" != "hello"',
    operators.notEqual("hello", "hello")
)

// Test 5: Different booleans
await test(
    5,
    "different booleans",
    'true != false',
    operators.notEqual(true, false)
)

// Test 6: Same booleans
await test(
    6,
    "same booleans",
    'true != true',
    operators.notEqual(true, true)
)

// Test 7: Zero and non-zero
await test(
    7,
    "zero and non-zero",
    '0 != 5',
    operators.notEqual(0n, 5n)
)

printSummary()
