#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThanOrEqual - Chaining\n")

// Test 1: Multiple comparisons (all true)
await test(
    1,
    "chained all true",
    '(10 >= 5) && (5 >= 5)',
    operators.and(operators.greaterThanOrEqual(10n, 5n), operators.greaterThanOrEqual(5n, 5n))
)

// Test 2: Multiple comparisons (one false)
await test(
    2,
    "chained one false",
    '(10 >= 5) && (3 >= 5)',
    operators.and(operators.greaterThanOrEqual(10n, 5n), operators.greaterThanOrEqual(3n, 5n))
)

// Test 3: Or with comparisons
await test(
    3,
    "or with comparisons",
    '(3 >= 5) || (10 >= 10)',
    operators.or(operators.greaterThanOrEqual(3n, 5n), operators.greaterThanOrEqual(10n, 10n))
)

// Test 4: Negated comparison
await test(
    4,
    "negated comparison",
    '!(5 >= 10)',
    operators.negate(operators.greaterThanOrEqual(5n, 10n))
)

// Test 5: Sorted chain
await test(
    5,
    "descending chain",
    '(100 >= 50) && (50 >= 25)',
    operators.and(operators.greaterThanOrEqual(100n, 50n), operators.greaterThanOrEqual(50n, 25n))
)

// Test 6: All equal chain
await test(
    6,
    "all equal",
    '(5 >= 5) && (5 >= 5)',
    operators.and(operators.greaterThanOrEqual(5n, 5n), operators.greaterThanOrEqual(5n, 5n))
)

printSummary()
