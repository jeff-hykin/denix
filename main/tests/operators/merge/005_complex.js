#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.merge - Complex scenarios\n")

// Test 1: Large attrsets
await test(
    1,
    "large attrsets",
    '{a=1; b=2; c=3; d=4; e=5;} // {f=6; g=7; h=8;}',
    operators.merge(
        {a: 1n, b: 2n, c: 3n, d: 4n, e: 5n},
        {f: 6n, g: 7n, h: 8n}
    )
)

// Test 2: Nested structure merge
await test(
    2,
    "nested structures",
    '{a={x=1; y=2;}; b=3;} // {c={z=4;}; d=5;}',
    operators.merge(
        {a: {x: 1n, y: 2n}, b: 3n},
        {c: {z: 4n}, d: 5n}
    )
)

// Test 3: Complex values
await test(
    3,
    "complex values",
    '{a=[1 2 3]; b={x=1;};} // {c="hello"; d=true;}',
    operators.merge(
        {a: [1n, 2n, 3n], b: {x: 1n}},
        {c: "hello", d: true}
    )
)

// Test 4: Deep nesting replacement
await test(
    4,
    "deep nesting",
    '{a={b={c=1;};};} // {a={b={c=2;};};}',
    operators.merge(
        {a: {b: {c: 1n}}},
        {a: {b: {c: 2n}}}
    )
)

// Test 5: Many keys merge
await test(
    5,
    "many keys",
    '{k1=1; k2=2; k3=3;} // {k4=4; k5=5; k6=6;}',
    operators.merge(
        {k1: 1n, k2: 2n, k3: 3n},
        {k4: 4n, k5: 5n, k6: 6n}
    )
)

// Test 6: Partial overlap
await test(
    6,
    "partial overlap",
    '{a=1; b=2; c=3;} // {b=20; d=4; e=5;}',
    operators.merge(
        {a: 1n, b: 2n, c: 3n},
        {b: 20n, d: 4n, e: 5n}
    )
)

printSummary()
