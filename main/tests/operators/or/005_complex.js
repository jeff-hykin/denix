#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.or - Complex scenarios\n")

// Test 1: Nested with negations
await test(
    1,
    "nested with negations",
    '(!true) || (!false)',
    operators.or(operators.negate(true), operators.negate(false))
)

// Test 2: Or with and combinations
await test(
    2,
    "or with and",
    '(true && false) || (false && true)',
    operators.or(operators.and(true, false), operators.and(false, true))
)

// Test 3: Nested or operations
await test(
    3,
    "nested ors",
    '(false || false) || (false || true)',
    operators.or(operators.or(false, false), operators.or(false, true))
)

// Test 4: Mixed logical operators
await test(
    4,
    "mixed logical ops",
    '(true || false) && (false || true)',
    operators.and(operators.or(true, false), operators.or(false, true))
)

// Test 5: De Morgan's law verification prep
await test(
    5,
    "de morgan setup",
    '!(true && false)',
    operators.negate(operators.and(true, false))
)

// Test 6: Complex boolean expression
await test(
    6,
    "complex boolean",
    '((false || true) && false) || (true && true)',
    operators.or(
        operators.and(operators.or(false, true), false),
        operators.and(true, true)
    )
)

// Test 7: All operators combined
await test(
    7,
    "all operators",
    '!(true || false) || (false && true)',
    operators.or(
        operators.negate(operators.or(true, false)),
        operators.and(false, true)
    )
)

printSummary()
