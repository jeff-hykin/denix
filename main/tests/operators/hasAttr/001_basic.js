#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.hasAttr - Basic tests\n")

// Test 1: Has attribute - true
await test(
    1,
    "has attribute",
    '{a=1;} ? a',
    operators.hasAttr({a: 1n}, "a")
)

// Test 2: Missing attribute - false
await test(
    2,
    "missing attribute",
    '{a=1;} ? b',
    operators.hasAttr({a: 1n}, "b")
)

// Test 3: Multiple attributes, check first
await test(
    3,
    "check first of many",
    '{a=1; b=2; c=3;} ? a',
    operators.hasAttr({a: 1n, b: 2n, c: 3n}, "a")
)

// Test 4: Multiple attributes, check middle
await test(
    4,
    "check middle",
    '{a=1; b=2; c=3;} ? b',
    operators.hasAttr({a: 1n, b: 2n, c: 3n}, "b")
)

// Test 5: Multiple attributes, check last
await test(
    5,
    "check last",
    '{a=1; b=2; c=3;} ? c',
    operators.hasAttr({a: 1n, b: 2n, c: 3n}, "c")
)

// Test 6: Empty attrset
await test(
    6,
    "empty attrset",
    '{} ? a',
    operators.hasAttr({}, "a")
)

// Test 7: Null value attribute exists
await test(
    7,
    "null value exists",
    '{a=null;} ? a',
    operators.hasAttr({a: null}, "a")
)

printSummary()
