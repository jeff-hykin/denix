#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.hasAttr - Complex scenarios\n")

// Test 1: After merge (attribute added)
await test(
    1,
    "after merge added",
    '({a=1;} // {b=2;}) ? b',
    operators.hasAttr(operators.merge({a: 1n}, {b: 2n}), "b")
)

// Test 2: After merge (attribute overwritten)
await test(
    2,
    "after merge overwritten",
    '({a=1;} // {a=2;}) ? a',
    operators.hasAttr(operators.merge({a: 1n}, {a: 2n}), "a")
)

// Test 3: Large attrset
await test(
    3,
    "large attrset",
    '{a=1; b=2; c=3; d=4; e=5; f=6; g=7; h=8;} ? e',
    operators.hasAttr({a: 1n, b: 2n, c: 3n, d: 4n, e: 5n, f: 6n, g: 7n, h: 8n}, "e")
)

// Test 4: Check missing in large set
await test(
    4,
    "missing in large set",
    '{a=1; b=2; c=3; d=4; e=5;} ? z',
    operators.hasAttr({a: 1n, b: 2n, c: 3n, d: 4n, e: 5n}, "z")
)

// Test 5: Complex boolean with hasAttr
await test(
    5,
    "complex boolean",
    '(({a=1;} ? a) && ({b=2;} ? b)) || ({c=3;} ? d)',
    operators.or(
        operators.and(operators.hasAttr({a: 1n}, "a"), operators.hasAttr({b: 2n}, "b")),
        operators.hasAttr({c: 3n}, "d")
    )
)

// Test 6: Check all attributes exist
await test(
    6,
    "all exist",
    '({a=1; b=2; c=3;} ? a) && ({a=1; b=2; c=3;} ? b) && ({a=1; b=2; c=3;} ? c)',
    operators.and(
        operators.and(
            operators.hasAttr({a: 1n, b: 2n, c: 3n}, "a"),
            operators.hasAttr({a: 1n, b: 2n, c: 3n}, "b")
        ),
        operators.hasAttr({a: 1n, b: 2n, c: 3n}, "c")
    )
)

printSummary()
