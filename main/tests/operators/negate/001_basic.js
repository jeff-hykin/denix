#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negate - Basic tests\n")

// Test 1: Negate true
await test(
    1,
    "negate true",
    '!true',
    operators.negate(true)
)

// Test 2: Negate false
await test(
    2,
    "negate false",
    '!false',
    operators.negate(false)
)

// Test 3: Double negation of true
await test(
    3,
    "double negation of true",
    '!!true',
    operators.negate(operators.negate(true))
)

// Test 4: Double negation of false
await test(
    4,
    "double negation of false",
    '!!false',
    operators.negate(operators.negate(false))
)

// Test 5: Triple negation of true
await test(
    5,
    "triple negation of true",
    '!!!true',
    operators.negate(operators.negate(operators.negate(true)))
)

// Test 6: Triple negation of false
await test(
    6,
    "triple negation of false",
    '!!!false',
    operators.negate(operators.negate(operators.negate(false)))
)

printSummary()
