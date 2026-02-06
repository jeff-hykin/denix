#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.multiply - Complex expressions\n")

// Test 1: Chained multiplication
await test(
    1,
    "chained multiplication",
    '2 * 3 * 4',
    operators.multiply(operators.multiply(2n, 3n), 4n)
)

// Test 2: Multiplication with addition
await test(
    2,
    "with addition",
    '(5 + 5) * 3',
    operators.multiply(5n + 5n, 3n)
)

// Test 3: Multiplication with division
await test(
    3,
    "with division",
    '(20 * 2) / 5',
    operators.divide(operators.multiply(20n, 2n), 5n)
)

// Test 4: Complex arithmetic
await test(
    4,
    "complex arithmetic",
    '10 * (5 * 2)',
    operators.multiply(10n, operators.multiply(5n, 2n))
)

// Test 5: Float chain
await test(
    5,
    "float chain",
    '2.0 * 3.0 * 4.0',
    operators.multiply(operators.multiply(2.0, 3.0), 4.0)
)

// Test 6: Mixed types
await test(
    6,
    "mixed types",
    '(10 * 2) * 1.5',
    operators.multiply(operators.multiply(10n, 2n), 1.5)
)

// Test 7: Distributive property simulation
await test(
    7,
    "distributive property",
    '5 * (3 + 2)',
    operators.multiply(5n, 3n + 2n)
)

printSummary()
