#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.merge - Different value types\n")

// Test 1: Integer values
await test(
    1,
    "integer values",
    '{a=1; b=2;} // {c=3;}',
    operators.merge({a: 1n, b: 2n}, {c: 3n})
)

// Test 2: String values
await test(
    2,
    "string values",
    '{a="hello";} // {b="world";}',
    operators.merge({a: "hello"}, {b: "world"})
)

// Test 3: Boolean values
await test(
    3,
    "boolean values",
    '{a=true;} // {b=false;}',
    operators.merge({a: true}, {b: false})
)

// Test 4: Null values
await test(
    4,
    "null values",
    '{a=null;} // {b=null;}',
    operators.merge({a: null}, {b: null})
)

// Test 5: Mixed types
await test(
    5,
    "mixed types",
    '{a=1; b="two";} // {c=true; d=null;}',
    operators.merge({a: 1n, b: "two"}, {c: true, d: null})
)

// Test 6: List values
await test(
    6,
    "list values",
    '{a=[1 2];} // {b=[3 4];}',
    operators.merge({a: [1n, 2n]}, {b: [3n, 4n]})
)

// Test 7: Nested attrset values
await test(
    7,
    "nested attrsets",
    '{a={x=1;};} // {b={y=2;};}',
    operators.merge({a: {x: 1n}}, {b: {y: 2n}})
)

printSummary()
