#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.equal - Attribute sets\n")

// Test 1: Equal attrsets
await test(
    1,
    "equal attrsets",
    '{a=1; b=2;} == {a=1; b=2;}',
    operators.equal({a: 1n, b: 2n}, {a: 1n, b: 2n})
)

// Test 2: Different values
await test(
    2,
    "different values",
    '{a=1;} == {a=2;}',
    operators.equal({a: 1n}, {a: 2n})
)

// Test 3: Different keys
await test(
    3,
    "different keys",
    '{a=1;} == {b=1;}',
    operators.equal({a: 1n}, {b: 1n})
)

// Test 4: Empty attrsets
await test(
    4,
    "empty attrsets",
    '{} == {}',
    operators.equal({}, {})
)

// Test 5: Empty vs non-empty
await test(
    5,
    "empty vs non-empty",
    '{} == {a=1;}',
    operators.equal({}, {a: 1n})
)

// Test 6: Nested attrsets equal
await test(
    6,
    "nested equal",
    '{a={x=1; y=2;};} == {a={x=1; y=2;};}',
    operators.equal({a: {x: 1n, y: 2n}}, {a: {x: 1n, y: 2n}})
)

// Test 7: Nested attrsets different
await test(
    7,
    "nested different",
    '{a={x=1;};} == {a={x=2;};}',
    operators.equal({a: {x: 1n}}, {a: {x: 2n}})
)

printSummary()
