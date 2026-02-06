#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.implication - With comparisons\n")

// Test 1: Both true comparisons
await test(
    1,
    "true comparison implies true comparison",
    '(5 > 3) -> (10 < 20)',
    operators.implication(operators.greaterThan(5n, 3n), operators.lessThan(10n, 20n))
)

// Test 2: True implies false
await test(
    2,
    "true comparison implies false comparison",
    '(5 > 3) -> (10 > 20)',
    operators.implication(operators.greaterThan(5n, 3n), operators.greaterThan(10n, 20n))
)

// Test 3: False implies true (vacuous)
await test(
    3,
    "false comparison implies true comparison",
    '(5 < 3) -> (10 < 20)',
    operators.implication(operators.lessThan(5n, 3n), operators.lessThan(10n, 20n))
)

// Test 4: False implies false (vacuous)
await test(
    4,
    "false comparison implies false comparison",
    '(5 < 3) -> (10 > 20)',
    operators.implication(operators.lessThan(5n, 3n), operators.greaterThan(10n, 20n))
)

// Test 5: Equality implications
await test(
    5,
    "equality implications",
    '(5 == 5) -> (10 == 10)',
    operators.implication(operators.equal(5n, 5n), operators.equal(10n, 10n))
)

// Test 6: Mixed comparison types
await test(
    6,
    "mixed comparison types",
    '(5 >= 5) -> (10 <= 10)',
    operators.implication(operators.greaterThanOrEqual(5n, 5n), operators.lessThanOrEqual(10n, 10n))
)

// Test 7: Chained with comparisons
await test(
    7,
    "chained with comparisons",
    '(100 > 50) -> ((25 < 30) -> (15 == 15))',
    operators.implication(
        operators.greaterThan(100n, 50n),
        operators.implication(operators.lessThan(25n, 30n), operators.equal(15n, 15n))
    )
)

printSummary()
