#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThan - Chaining and expressions\n")

// Test 1: Multiple comparisons (all true)
await test(
    1,
    "chained comparisons all true",
    '(3 < 5) && (5 < 10)',
    operators.and(operators.lessThan(3n, 5n), operators.lessThan(5n, 10n))
)

// Test 2: Multiple comparisons (one false)
await test(
    2,
    "chained comparisons one false",
    '(3 < 5) && (10 < 5)',
    operators.and(operators.lessThan(3n, 5n), operators.lessThan(10n, 5n))
)

// Test 3: Or with comparisons
await test(
    3,
    "or with comparisons",
    '(10 < 5) || (3 < 5)',
    operators.or(operators.lessThan(10n, 5n), operators.lessThan(3n, 5n))
)

// Test 4: Negated comparison
await test(
    4,
    "negated comparison",
    '!(3 < 10)',
    operators.negate(operators.lessThan(3n, 10n))
)

// Test 5: Complex expression
await test(
    5,
    "complex expression",
    '(1 < 5) && (10 < 25) && (50 < 100)',
    operators.and(
        operators.and(operators.lessThan(1n, 5n), operators.lessThan(10n, 25n)),
        operators.lessThan(50n, 100n)
    )
)

// Test 6: Mixed with equality
await test(
    6,
    "less than or equal check",
    '(5 < 10) || (5 == 10)',
    operators.or(operators.lessThan(5n, 10n), operators.equal(5n, 10n))
)

// Test 7: Transitivity
await test(
    7,
    "transitive property",
    '(3 < 5) && (5 < 10) && (3 < 10)',
    operators.and(
        operators.and(operators.lessThan(3n, 5n), operators.lessThan(5n, 10n)),
        operators.lessThan(3n, 10n)
    )
)

printSummary()
