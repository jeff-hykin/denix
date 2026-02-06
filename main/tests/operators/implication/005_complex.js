#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.implication - Complex scenarios\n")

// Test 1: Implication with negation
await test(
    1,
    "negated implication",
    '!(true -> false)',
    operators.negate(operators.implication(true, false))
)

// Test 2: Negated antecedent
await test(
    2,
    "negated antecedent",
    '(!false) -> true',
    operators.implication(operators.negate(false), true)
)

// Test 3: Negated consequent
await test(
    3,
    "negated consequent",
    'true -> (!true)',
    operators.implication(true, operators.negate(true))
)

// Test 4: With and operator
await test(
    4,
    "implication with and",
    '(true && false) -> true',
    operators.implication(operators.and(true, false), true)
)

// Test 5: With or operator
await test(
    5,
    "implication with or",
    '(false || true) -> (true || false)',
    operators.implication(operators.or(false, true), operators.or(true, false))
)

// Test 6: Nested implications with logic
await test(
    6,
    "nested implications with logic",
    '(true -> false) -> ((false -> true) -> true)',
    operators.implication(
        operators.implication(true, false),
        operators.implication(operators.implication(false, true), true)
    )
)

// Test 7: Complex boolean algebra
await test(
    7,
    "complex boolean algebra",
    '((true && false) || true) -> (false || true)',
    operators.implication(
        operators.or(operators.and(true, false), true),
        operators.or(false, true)
    )
)

printSummary()
