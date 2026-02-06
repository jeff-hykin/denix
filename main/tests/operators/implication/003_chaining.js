#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.implication - Chaining (right-associative)\n")

// Test 1: Three true values (right-associative)
await test(
    1,
    "true -> true -> true",
    'true -> (true -> true)',
    operators.implication(true, operators.implication(true, true))
)

// Test 2: Left false, rest true
await test(
    2,
    "false -> true -> true",
    'false -> (true -> true)',
    operators.implication(false, operators.implication(true, true))
)

// Test 3: Middle false
await test(
    3,
    "true -> false -> true",
    'true -> (false -> true)',
    operators.implication(true, operators.implication(false, true))
)

// Test 4: Right false
await test(
    4,
    "true -> true -> false",
    'true -> (true -> false)',
    operators.implication(true, operators.implication(true, false))
)

// Test 5: All false
await test(
    5,
    "false -> false -> false",
    'false -> (false -> false)',
    operators.implication(false, operators.implication(false, false))
)

// Test 6: Four-level implication
await test(
    6,
    "four-level implication",
    'true -> (true -> (true -> true))',
    operators.implication(true, operators.implication(true, operators.implication(true, true)))
)

// Test 7: Complex chain
await test(
    7,
    "complex chain",
    'false -> (true -> (false -> true))',
    operators.implication(false, operators.implication(true, operators.implication(false, true)))
)

printSummary()
