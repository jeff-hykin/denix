#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThanOrEqual - Chaining\n")

// Test 1: Multiple comparisons (all true)
await test(
    1,
    "chained all true",
    '(5 <= 10) && (5 <= 5)',
    operators.and(operators.lessThanOrEqual(5n, 10n), operators.lessThanOrEqual(5n, 5n))
)

// Test 2: Multiple comparisons (one false)
await test(
    2,
    "chained one false",
    '(5 <= 10) && (10 <= 5)',
    operators.and(operators.lessThanOrEqual(5n, 10n), operators.lessThanOrEqual(10n, 5n))
)

// Test 3: Or with comparisons
await test(
    3,
    "or with comparisons",
    '(10 <= 5) || (10 <= 10)',
    operators.or(operators.lessThanOrEqual(10n, 5n), operators.lessThanOrEqual(10n, 10n))
)

// Test 4: Negated comparison
await test(
    4,
    "negated comparison",
    '!(10 <= 5)',
    operators.negate(operators.lessThanOrEqual(10n, 5n))
)

// Test 5: Sorted chain
await test(
    5,
    "ascending chain",
    '(25 <= 50) && (50 <= 100)',
    operators.and(operators.lessThanOrEqual(25n, 50n), operators.lessThanOrEqual(50n, 100n))
)

// Test 6: All equal chain
await test(
    6,
    "all equal",
    '(5 <= 5) && (5 <= 5)',
    operators.and(operators.lessThanOrEqual(5n, 5n), operators.lessThanOrEqual(5n, 5n))
)

printSummary()
