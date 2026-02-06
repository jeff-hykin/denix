#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.merge - Basic tests\n")

// Test 1: Simple merge
await test(
    1,
    "simple merge",
    '{a=1;} // {b=2;}',
    operators.merge({a: 1n}, {b: 2n})
)

// Test 2: Empty left
await test(
    2,
    "empty left",
    '{} // {a=1;}',
    operators.merge({}, {a: 1n})
)

// Test 3: Empty right
await test(
    3,
    "empty right",
    '{a=1;} // {}',
    operators.merge({a: 1n}, {})
)

// Test 4: Both empty
await test(
    4,
    "both empty",
    '{} // {}',
    operators.merge({}, {})
)

// Test 5: Multiple keys
await test(
    5,
    "multiple keys",
    '{a=1; b=2;} // {c=3; d=4;}',
    operators.merge({a: 1n, b: 2n}, {c: 3n, d: 4n})
)

// Test 6: Overlapping keys (right wins)
await test(
    6,
    "overlapping keys",
    '{a=1; b=2;} // {b=3; c=4;}',
    operators.merge({a: 1n, b: 2n}, {b: 3n, c: 4n})
)

// Test 7: Same key override
await test(
    7,
    "same key override",
    '{x=10;} // {x=20;}',
    operators.merge({x: 10n}, {x: 20n})
)

printSummary()
