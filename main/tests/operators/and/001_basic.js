#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.and - Basic tests\n")

// Test 1: true && true
await test(
    1,
    "true and true",
    'true && true',
    operators.and(true, true)
)

// Test 2: true && false
await test(
    2,
    "true and false",
    'true && false',
    operators.and(true, false)
)

// Test 3: false && true
await test(
    3,
    "false and true",
    'false && true',
    operators.and(false, true)
)

// Test 4: false && false
await test(
    4,
    "false and false",
    'false && false',
    operators.and(false, false)
)

// Test 5: Chained and (all true)
await test(
    5,
    "chained and all true",
    'true && true && true',
    operators.and(operators.and(true, true), true)
)

// Test 6: Chained and (one false)
await test(
    6,
    "chained and with one false",
    'true && false && true',
    operators.and(operators.and(true, false), true)
)

// Test 7: Multiple false values
await test(
    7,
    "chained and all false",
    'false && false && false',
    operators.and(operators.and(false, false), false)
)

printSummary()
