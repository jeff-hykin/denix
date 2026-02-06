#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.and - With comparisons\n")

// Test 1: Two true comparisons
await test(
    1,
    "two true comparisons",
    '(5 > 3) && (10 < 20)',
    operators.and(operators.greaterThan(5n, 3n), operators.lessThan(10n, 20n))
)

// Test 2: True and false comparison
await test(
    2,
    "true and false comparison",
    '(5 > 3) && (10 > 20)',
    operators.and(operators.greaterThan(5n, 3n), operators.greaterThan(10n, 20n))
)

// Test 3: Two false comparisons
await test(
    3,
    "two false comparisons",
    '(5 < 3) && (10 > 20)',
    operators.and(operators.lessThan(5n, 3n), operators.greaterThan(10n, 20n))
)

// Test 4: Equality comparisons
await test(
    4,
    "equality comparisons",
    '(5 == 5) && (10 == 10)',
    operators.and(operators.equal(5n, 5n), operators.equal(10n, 10n))
)

// Test 5: Mixed comparison types
await test(
    5,
    "mixed comparison types",
    '(5 >= 5) && (10 <= 10)',
    operators.and(operators.greaterThanOrEqual(5n, 5n), operators.lessThanOrEqual(10n, 10n))
)

// Test 6: Inequality with and
await test(
    6,
    "inequality with and",
    '(5 != 3) && (10 != 20)',
    operators.and(operators.notEqual(5n, 3n), operators.notEqual(10n, 20n))
)

// Test 7: Complex numeric comparisons
await test(
    7,
    "complex comparisons",
    '(100 > 50) && (25 < 30) && (15 == 15)',
    operators.and(
        operators.and(operators.greaterThan(100n, 50n), operators.lessThan(25n, 30n)),
        operators.equal(15n, 15n)
    )
)

printSummary()
