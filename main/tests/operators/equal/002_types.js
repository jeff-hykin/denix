#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.equal - Different types\n")

// Test 1: Equal floats
await test(
    1,
    "equal floats",
    '3.14 == 3.14',
    operators.equal(3.14, 3.14)
)

// Test 2: Different floats
await test(
    2,
    "different floats",
    '3.14 == 2.71',
    operators.equal(3.14, 2.71)
)

// Test 3: Null equality
await test(
    3,
    "null equals null",
    'null == null',
    operators.equal(null, null)
)

// Test 4: Null vs value
await test(
    4,
    "null vs value",
    'null == 5',
    operators.equal(null, 5n)
)

// Test 5: Empty strings
await test(
    5,
    "empty strings",
    '"" == ""',
    operators.equal("", "")
)

// Test 6: Zero values
await test(
    6,
    "zero equality",
    '0 == 0',
    operators.equal(0n, 0n)
)

// Test 7: Zero float
await test(
    7,
    "zero float",
    '0.0 == 0.0',
    operators.equal(0.0, 0.0)
)

printSummary()
