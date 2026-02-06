#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.merge - Right precedence\n")

// Test 1: Right overwrites left
await test(
    1,
    "right overwrites",
    '{a=1;} // {a=2;}',
    operators.merge({a: 1n}, {a: 2n})
)

// Test 2: Multiple overwrites
await test(
    2,
    "multiple overwrites",
    '{a=1; b=2; c=3;} // {a=10; c=30;}',
    operators.merge({a: 1n, b: 2n, c: 3n}, {a: 10n, c: 30n})
)

// Test 3: Type change on merge
await test(
    3,
    "type change",
    '{a=1;} // {a="one";}',
    operators.merge({a: 1n}, {a: "one"})
)

// Test 4: Null overwrite
await test(
    4,
    "null overwrite",
    '{a=1;} // {a=null;}',
    operators.merge({a: 1n}, {a: null})
)

// Test 5: Value to attrset
await test(
    5,
    "value to attrset",
    '{a=1;} // {a={x=1;};}',
    operators.merge({a: 1n}, {a: {x: 1n}})
)

// Test 6: Attrset to value
await test(
    6,
    "attrset to value",
    '{a={x=1;};} // {a=42;}',
    operators.merge({a: {x: 1n}}, {a: 42n})
)

// Test 7: All keys overwritten
await test(
    7,
    "all overwritten",
    '{a=1; b=2;} // {a=10; b=20;}',
    operators.merge({a: 1n, b: 2n}, {a: 10n, b: 20n})
)

printSummary()
