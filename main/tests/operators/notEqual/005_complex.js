#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.notEqual - Complex scenarios\n")

// Test 1: Negation of equality
await test(
    1,
    "not equal is negation of equal",
    '5 != 5',
    !operators.equal(5n, 5n)
)

// Test 2: Multiple inequalities
await test(
    2,
    "chained inequalities",
    '(5 != 3) && (10 != 20)',
    operators.and(operators.notEqual(5n, 3n), operators.notEqual(10n, 20n))
)

// Test 3: Mixed with other comparisons
await test(
    3,
    "not equal with greater than",
    '(5 != 3) && (5 > 3)',
    operators.and(operators.notEqual(5n, 3n), operators.greaterThan(5n, 3n))
)

// Test 4: Deep nested structures
await test(
    4,
    "deeply nested different",
    '[[{a=1;}]] != [[{a=2;}]]',
    operators.notEqual([[{a: 1n}]], [[{a: 2n}]])
)

// Test 5: Deep nested structures same
await test(
    5,
    "deeply nested same",
    '[[{a=1;}]] != [[{a=1;}]]',
    operators.notEqual([[{a: 1n}]], [[{a: 1n}]])
)

// Test 6: Mixed types in structures
await test(
    6,
    "mixed types in lists",
    '[1 "two" true] != [1 "two" false]',
    operators.notEqual([1n, "two", true], [1n, "two", false])
)

// Test 7: Large numbers
await test(
    7,
    "large different numbers",
    '999999 != 1000000',
    operators.notEqual(999999n, 1000000n)
)

printSummary()
