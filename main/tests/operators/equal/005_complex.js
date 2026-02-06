#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.equal - Complex scenarios\n")

// Test 1: Deep nested structures equal
await test(
    1,
    "deeply nested equal",
    '[[{a=1;}]] == [[{a=1;}]]',
    operators.equal([[{a: 1n}]], [[{a: 1n}]])
)

// Test 2: Deep nested structures different
await test(
    2,
    "deeply nested different",
    '[[{a=1;}]] == [[{a=2;}]]',
    operators.equal([[{a: 1n}]], [[{a: 2n}]])
)

// Test 3: Mixed types in lists equal
await test(
    3,
    "mixed types equal",
    '[1 "two" true null] == [1 "two" true null]',
    operators.equal([1n, "two", true, null], [1n, "two", true, null])
)

// Test 4: Mixed types in lists different
await test(
    4,
    "mixed types different",
    '[1 "two" true] == [1 "two" false]',
    operators.equal([1n, "two", true], [1n, "two", false])
)

// Test 5: Complex attrset with lists
await test(
    5,
    "attrset with lists equal",
    '{a=[1 2]; b={x=3;};} == {a=[1 2]; b={x=3;};}',
    operators.equal(
        {a: [1n, 2n], b: {x: 3n}},
        {a: [1n, 2n], b: {x: 3n}}
    )
)

// Test 6: Large structures
await test(
    6,
    "large structures equal",
    '{a=1; b=2; c=3; d=4; e=5;} == {a=1; b=2; c=3; d=4; e=5;}',
    operators.equal(
        {a: 1n, b: 2n, c: 3n, d: 4n, e: 5n},
        {a: 1n, b: 2n, c: 3n, d: 4n, e: 5n}
    )
)

// Test 7: In boolean expressions
await test(
    7,
    "in boolean expression",
    '([1 2] == [1 2]) && ({a=1;} == {a=1;})',
    operators.and(
        operators.equal([1n, 2n], [1n, 2n]),
        operators.equal({a: 1n}, {a: 1n})
    )
)

printSummary()
