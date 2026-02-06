#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negative - Complex expressions\n")

// Test 1: Negation in arithmetic context
await test(
    1,
    "negation with addition",
    '-(5) + 10',
    operators.negative(5n) + 10n
)

// Test 2: Negation with subtraction
await test(
    2,
    "negation with subtraction",
    '10 - (-(5))',
    10n - operators.negative(5n)
)

// Test 3: Multiple negations in expression
await test(
    3,
    "multiple negations",
    '-(3) + -(4)',
    operators.negative(3n) + operators.negative(4n)
)

// Test 4: Negation of float in expression
await test(
    4,
    "float negation in expression",
    '-(2.5) + 5.0',
    operators.negative(2.5) + 5.0
)

// Test 5: Nested negations
await test(
    5,
    "nested double negation",
    '-(-(-(-(5))))',
    operators.negative(operators.negative(operators.negative(operators.negative(5n))))
)

// Test 6: Negation of result
await test(
    6,
    "negate sum",
    '-(10 + 5)',
    operators.negative(10n + 5n)
)

printSummary()
