#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.greaterThan - Chaining and expressions\n")

// Test 1: Multiple comparisons (all true)
await test(
    1,
    "chained comparisons all true",
    '(10 > 5) && (5 > 3)',
    operators.and(operators.greaterThan(10n, 5n), operators.greaterThan(5n, 3n))
)

// Test 2: Multiple comparisons (one false)
await test(
    2,
    "chained comparisons one false",
    '(10 > 5) && (3 > 5)',
    operators.and(operators.greaterThan(10n, 5n), operators.greaterThan(3n, 5n))
)

// Test 3: Or with comparisons
await test(
    3,
    "or with comparisons",
    '(3 > 5) || (10 > 5)',
    operators.or(operators.greaterThan(3n, 5n), operators.greaterThan(10n, 5n))
)

// Test 4: Negated comparison
await test(
    4,
    "negated comparison",
    '!(10 > 5)',
    operators.negate(operators.greaterThan(10n, 5n))
)

// Test 5: Complex expression
await test(
    5,
    "complex expression",
    '(100 > 50) && (25 > 10) && (5 > 1)',
    operators.and(
        operators.and(operators.greaterThan(100n, 50n), operators.greaterThan(25n, 10n)),
        operators.greaterThan(5n, 1n)
    )
)

// Test 6: Mixed with equality
await test(
    6,
    "greater than or equal check",
    '(10 > 5) || (10 == 5)',
    operators.or(operators.greaterThan(10n, 5n), operators.equal(10n, 5n))
)

// Test 7: Transitivity
await test(
    7,
    "transitive property",
    '(10 > 5) && (5 > 3) && (10 > 3)',
    operators.and(
        operators.and(operators.greaterThan(10n, 5n), operators.greaterThan(5n, 3n)),
        operators.greaterThan(10n, 3n)
    )
)

printSummary()
