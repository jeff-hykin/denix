#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.notEqual - Different types\n")

// Test 1: Floats - different
await test(
    1,
    "different floats",
    '3.14 != 2.71',
    operators.notEqual(3.14, 2.71)
)

// Test 2: Floats - same
await test(
    2,
    "same floats",
    '3.14 != 3.14',
    operators.notEqual(3.14, 3.14)
)

// Test 3: Null comparison
await test(
    3,
    "null with integer",
    'null != 5',
    operators.notEqual(null, 5n)
)

// Test 4: Null with null
await test(
    4,
    "null with null",
    'null != null',
    operators.notEqual(null, null)
)

// Test 5: Empty string vs non-empty
await test(
    5,
    "empty vs non-empty string",
    '"" != "hello"',
    operators.notEqual("", "hello")
)

// Test 6: Empty strings
await test(
    6,
    "empty strings",
    '"" != ""',
    operators.notEqual("", "")
)

// Test 7: Boolean vs integer (different types)
await test(
    7,
    "different types",
    'true != 1',
    operators.notEqual(true, 1n)
)

printSummary()
