#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.divide - Complex expressions\n")

// Test 1: Chained division
await test(
    1,
    "chained division",
    '100 / 10 / 2',
    operators.divide(operators.divide(100n, 10n), 2n)
)

// Test 2: Division with addition
await test(
    2,
    "division with addition",
    '(10 + 10) / 5',
    operators.divide(10n + 10n, 5n)
)

// Test 3: Division with multiplication
await test(
    3,
    "division with multiplication",
    '(10 * 2) / 5',
    operators.divide(operators.multiply(10n, 2n), 5n)
)

// Test 4: Complex arithmetic
await test(
    4,
    "complex arithmetic",
    '100 / (10 / 2)',
    operators.divide(100n, operators.divide(10n, 2n))
)

// Test 5: Float arithmetic chain
await test(
    5,
    "float chain",
    '10.0 / 2.0 / 2.0',
    operators.divide(operators.divide(10.0, 2.0), 2.0)
)

// Test 6: Mixed int and float
await test(
    6,
    "mixed types",
    '(20 / 4) / 2.5',
    operators.divide(operators.divide(20n, 4n), 2.5)
)

printSummary()
