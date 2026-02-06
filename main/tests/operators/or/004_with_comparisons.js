#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.or - With comparisons\n")

// Test 1: Two true comparisons
await test(
    1,
    "two true comparisons",
    '(5 > 3) || (10 < 20)',
    operators.or(operators.greaterThan(5n, 3n), operators.lessThan(10n, 20n))
)

// Test 2: True or false comparison
await test(
    2,
    "true or false comparison",
    '(5 > 3) || (10 > 20)',
    operators.or(operators.greaterThan(5n, 3n), operators.greaterThan(10n, 20n))
)

// Test 3: False or true comparison
await test(
    3,
    "false or true comparison",
    '(5 < 3) || (10 < 20)',
    operators.or(operators.lessThan(5n, 3n), operators.lessThan(10n, 20n))
)

// Test 4: Two false comparisons
await test(
    4,
    "two false comparisons",
    '(5 < 3) || (10 > 20)',
    operators.or(operators.lessThan(5n, 3n), operators.greaterThan(10n, 20n))
)

// Test 5: Equality comparisons
await test(
    5,
    "equality comparisons",
    '(5 == 3) || (10 == 10)',
    operators.or(operators.equal(5n, 3n), operators.equal(10n, 10n))
)

// Test 6: Mixed comparison types
await test(
    6,
    "mixed comparison types",
    '(5 < 5) || (10 >= 10)',
    operators.or(operators.lessThan(5n, 5n), operators.greaterThanOrEqual(10n, 10n))
)

// Test 7: Complex numeric comparisons
await test(
    7,
    "complex comparisons",
    '(100 < 50) || (25 > 30) || (15 == 15)',
    operators.or(
        operators.or(operators.lessThan(100n, 50n), operators.greaterThan(25n, 30n)),
        operators.equal(15n, 15n)
    )
)

printSummary()
