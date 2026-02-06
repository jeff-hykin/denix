#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.implication - Truth table\n")

// Complete truth table for IMPLICATION (a -> b equivalent to !a || b)

// Test 1: T -> T = T
await test(
    1,
    "T implies T equals T",
    'true -> true',
    operators.implication(true, true)
)

// Test 2: T -> F = F (only false case)
await test(
    2,
    "T implies F equals F",
    'true -> false',
    operators.implication(true, false)
)

// Test 3: F -> T = T (vacuous truth)
await test(
    3,
    "F implies T equals T",
    'false -> true',
    operators.implication(false, true)
)

// Test 4: F -> F = T (vacuous truth)
await test(
    4,
    "F implies F equals T",
    'false -> false',
    operators.implication(false, false)
)

// Test 5: Verify equivalence to !a || b (case 1)
await test(
    5,
    "equivalence: true -> true == !true || true",
    '!true || true',
    operators.implication(true, true)
)

// Test 6: Verify equivalence to !a || b (case 2)
await test(
    6,
    "equivalence: true -> false == !true || false",
    '!true || false',
    operators.implication(true, false)
)

// Test 7: Verify equivalence to !a || b (case 3)
await test(
    7,
    "equivalence: false -> true == !false || true",
    '!false || true',
    operators.implication(false, true)
)

printSummary()
