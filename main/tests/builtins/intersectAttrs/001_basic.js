#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.intersectAttrs - Basic tests\n")

// Test 1: Basic intersection
await test(
    1,
    "basic intersection",
    'builtins.intersectAttrs {x=1; y=2;} {x=10; z=30;}',
    builtins.intersectAttrs({ x: 1n, y: 2n })({ x: 10n, z: 30n })
)

// Test 2: No overlap
await test(
    2,
    "no overlap",
    'builtins.intersectAttrs {x=1;} {y=2;}',
    builtins.intersectAttrs({ x: 1n })({ y: 2n })
)

// Test 3: Complete overlap
await test(
    3,
    "complete overlap",
    'builtins.intersectAttrs {x=1; y=2;} {x=10; y=20;}',
    builtins.intersectAttrs({ x: 1n, y: 2n })({ x: 10n, y: 20n })
)

// Test 4: Empty first set
await test(
    4,
    "empty first set",
    'builtins.intersectAttrs {} {x=1; y=2;}',
    builtins.intersectAttrs({})({ x: 1n, y: 2n })
)

// Test 5: Empty second set
await test(
    5,
    "empty second set",
    'builtins.intersectAttrs {x=1; y=2;} {}',
    builtins.intersectAttrs({ x: 1n, y: 2n })({})
)

// Test 6: Both empty
await test(
    6,
    "both empty",
    'builtins.intersectAttrs {} {}',
    builtins.intersectAttrs({})({})
)

// Test 7: Values from second set
await test(
    7,
    "takes values from second set",
    'builtins.intersectAttrs {a=1; b=2; c=3;} {b=20; c=30; d=40;}',
    builtins.intersectAttrs({ a: 1n, b: 2n, c: 3n })({ b: 20n, c: 30n, d: 40n })
)

printSummary()
