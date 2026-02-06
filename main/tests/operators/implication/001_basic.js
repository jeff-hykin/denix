#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.implication - Basic tests\n")

// Test 1: true -> true
await test(
    1,
    "true implies true",
    'true -> true',
    operators.implication(true, true)
)

// Test 2: true -> false
await test(
    2,
    "true implies false",
    'true -> false',
    operators.implication(true, false)
)

// Test 3: false -> true
await test(
    3,
    "false implies true",
    'false -> true',
    operators.implication(false, true)
)

// Test 4: false -> false
await test(
    4,
    "false implies false",
    'false -> false',
    operators.implication(false, false)
)

// Test 5: Chained implications
await test(
    5,
    "chained implications",
    'true -> true -> true',
    operators.implication(true, operators.implication(true, true))
)

// Test 6: Mixed chain
await test(
    6,
    "mixed implication chain",
    'false -> true -> false',
    operators.implication(false, operators.implication(true, false))
)

printSummary()
