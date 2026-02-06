#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negate - Complex scenarios\n")

// Test 1: Quadruple negation
await test(
    1,
    "quadruple negation",
    '!!!!true',
    operators.negate(operators.negate(operators.negate(operators.negate(true))))
)

// Test 2: Quintuple negation
await test(
    2,
    "quintuple negation",
    '!!!!!false',
    operators.negate(operators.negate(operators.negate(operators.negate(operators.negate(false)))))
)

// Test 3: Nested logical with negations
await test(
    3,
    "nested logical",
    '!((true && false) || (false && true))',
    operators.negate(operators.or(operators.and(true, false), operators.and(false, true)))
)

// Test 4: Negated implication chains
await test(
    4,
    "negated implication",
    '!(true -> (false -> true))',
    operators.negate(operators.implication(true, operators.implication(false, true)))
)

// Test 5: Mixed negations and operators
await test(
    5,
    "mixed negations",
    '!((!true) && (!false))',
    operators.negate(operators.and(operators.negate(true), operators.negate(false)))
)

// Test 6: Complex boolean algebra
await test(
    6,
    "boolean algebra",
    '!((true || false) && (false || true))',
    operators.negate(operators.and(operators.or(true, false), operators.or(false, true)))
)

printSummary()
