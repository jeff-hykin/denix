#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negate - With comparisons\n")

// Test 1: Negate equal comparison (true case)
await test(
    1,
    "negate true equality",
    '!(10 == 10)',
    operators.negate(operators.equal(10n, 10n))
)

// Test 2: Negate equal comparison (false case)
await test(
    2,
    "negate false equality",
    '!(10 == 5)',
    operators.negate(operators.equal(10n, 5n))
)

// Test 3: Negate greater than (true)
await test(
    3,
    "negate true greater than",
    '!(20 > 10)',
    operators.negate(operators.greaterThan(20n, 10n))
)

// Test 4: Negate greater than (false)
await test(
    4,
    "negate false greater than",
    '!(5 > 10)',
    operators.negate(operators.greaterThan(5n, 10n))
)

// Test 5: Negate less than (true)
await test(
    5,
    "negate true less than",
    '!(5 < 10)',
    operators.negate(operators.lessThan(5n, 10n))
)

// Test 6: Negate less than (false)
await test(
    6,
    "negate false less than",
    '!(10 < 5)',
    operators.negate(operators.lessThan(10n, 5n))
)

printSummary()
