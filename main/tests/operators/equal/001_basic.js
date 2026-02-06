#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.equal - Basic tests\n")

// Test 1: Equal integers
await test(
    1,
    "equal integers",
    '5 == 5',
    operators.equal(5n, 5n)
)

// Test 2: Different integers
await test(
    2,
    "different integers",
    '5 == 3',
    operators.equal(5n, 3n)
)

// Test 3: Equal strings
await test(
    3,
    "equal strings",
    '"hello" == "hello"',
    operators.equal("hello", "hello")
)

// Test 4: Different strings
await test(
    4,
    "different strings",
    '"hello" == "world"',
    operators.equal("hello", "world")
)

// Test 5: Equal booleans (true)
await test(
    5,
    "both true",
    'true == true',
    operators.equal(true, true)
)

// Test 6: Equal booleans (false)
await test(
    6,
    "both false",
    'false == false',
    operators.equal(false, false)
)

// Test 7: Different booleans
await test(
    7,
    "different booleans",
    'true == false',
    operators.equal(true, false)
)

printSummary()
