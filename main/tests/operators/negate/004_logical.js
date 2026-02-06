#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negate - With logical operators\n")

// Test 1: Negate and (both true)
await test(
    1,
    "negate and of two trues",
    '!(true && true)',
    operators.negate(operators.and(true, true))
)

// Test 2: Negate and (both false)
await test(
    2,
    "negate and of two falses",
    '!(false && false)',
    operators.negate(operators.and(false, false))
)

// Test 3: Negate and (mixed)
await test(
    3,
    "negate and of mixed",
    '!(true && false)',
    operators.negate(operators.and(true, false))
)

// Test 4: Negate or (both true)
await test(
    4,
    "negate or of two trues",
    '!(true || true)',
    operators.negate(operators.or(true, true))
)

// Test 5: Negate or (both false)
await test(
    5,
    "negate or of two falses",
    '!(false || false)',
    operators.negate(operators.or(false, false))
)

// Test 6: Negate implication
await test(
    6,
    "negate implication",
    '!(true -> false)',
    operators.negate(operators.implication(true, false))
)

// Test 7: De Morgan's Law - !(a && b) equivalent
await test(
    7,
    "de morgan law simulation",
    '!(true && false)',
    operators.negate(operators.and(true, false))
)

printSummary()
