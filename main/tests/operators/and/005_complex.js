#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.and - Complex scenarios\n")

// Test 1: Nested with negations
await test(
    1,
    "nested with negations",
    '(!false) && (!false)',
    operators.and(operators.negate(false), operators.negate(false))
)

// Test 2: And with or combinations
await test(
    2,
    "and with or",
    '(true || false) && (false || true)',
    operators.and(operators.or(true, false), operators.or(false, true))
)

// Test 3: Nested and operations
await test(
    3,
    "nested ands",
    '(true && true) && (true && true)',
    operators.and(operators.and(true, true), operators.and(true, true))
)

// Test 4: Mixed logical operators
await test(
    4,
    "mixed logical ops",
    '(true && false) || (true && true)',
    operators.or(operators.and(true, false), operators.and(true, true))
)

// Test 5: De Morgan's law verification prep
await test(
    5,
    "de morgan setup",
    '!(false || false)',
    operators.negate(operators.or(false, false))
)

// Test 6: Complex boolean expression
await test(
    6,
    "complex boolean",
    '((true && false) || true) && (false || true)',
    operators.and(
        operators.or(operators.and(true, false), true),
        operators.or(false, true)
    )
)

// Test 7: All operators combined
await test(
    7,
    "all operators",
    '!(false && true) && (true || false)',
    operators.and(
        operators.negate(operators.and(false, true)),
        operators.or(true, false)
    )
)

printSummary()
