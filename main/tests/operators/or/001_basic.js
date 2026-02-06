#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.or - Basic tests\n")

// Test 1: true || true
await test(
    1,
    "true or true",
    'true || true',
    operators.or(true, true)
)

// Test 2: true || false
await test(
    2,
    "true or false",
    'true || false',
    operators.or(true, false)
)

// Test 3: false || true
await test(
    3,
    "false or true",
    'false || true',
    operators.or(false, true)
)

// Test 4: false || false
await test(
    4,
    "false or false",
    'false || false',
    operators.or(false, false)
)

// Test 5: Chained or (all true)
await test(
    5,
    "chained or all true",
    'true || true || true',
    operators.or(operators.or(true, true), true)
)

// Test 6: Chained or (one true)
await test(
    6,
    "chained or with one true",
    'false || true || false',
    operators.or(operators.or(false, true), false)
)

// Test 7: Multiple false values
await test(
    7,
    "chained or all false",
    'false || false || false',
    operators.or(operators.or(false, false), false)
)

printSummary()
