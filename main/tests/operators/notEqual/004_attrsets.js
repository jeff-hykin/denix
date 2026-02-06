#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.notEqual - Attribute sets\n")

// Test 1: Different attrsets
await test(
    1,
    "different attrsets",
    '{a=1;} != {b=2;}',
    operators.notEqual({a: 1n}, {b: 2n})
)

// Test 2: Same attrsets
await test(
    2,
    "same attrsets",
    '{a=1; b=2;} != {a=1; b=2;}',
    operators.notEqual({a: 1n, b: 2n}, {a: 1n, b: 2n})
)

// Test 3: Different values, same keys
await test(
    3,
    "different values same keys",
    '{a=1;} != {a=2;}',
    operators.notEqual({a: 1n}, {a: 2n})
)

// Test 4: Empty attrsets
await test(
    4,
    "empty attrsets",
    '{} != {}',
    operators.notEqual({}, {})
)

// Test 5: Empty vs non-empty
await test(
    5,
    "empty vs non-empty attrset",
    '{} != {a=1;}',
    operators.notEqual({}, {a: 1n})
)

// Test 6: Nested attrsets - different
await test(
    6,
    "different nested attrsets",
    '{a={x=1;};} != {a={x=2;;};}',
    operators.notEqual({a: {x: 1n}}, {a: {x: 2n}})
)

// Test 7: Nested attrsets - same
await test(
    7,
    "same nested attrsets",
    '{a={x=1;};} != {a={x=1;};}',
    operators.notEqual({a: {x: 1n}}, {a: {x: 1n}})
)

printSummary()
