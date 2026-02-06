#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.multiply - Edge cases\n")

// Test 1: Multiply by 1
await test(
    1,
    "identity",
    '42 * 1',
    operators.multiply(42n, 1n)
)

// Test 2: Multiply by 0 (annihilator)
await test(
    2,
    "annihilator",
    '999 * 0',
    operators.multiply(999n, 0n)
)

// Test 3: Squaring a number
await test(
    3,
    "squaring",
    '7 * 7',
    operators.multiply(7n, 7n)
)

// Test 4: Powers of 10
await test(
    4,
    "powers of 10",
    '10 * 10 * 10',
    operators.multiply(operators.multiply(10n, 10n), 10n)
)

// Test 5: Large result
await test(
    5,
    "large result",
    '1000 * 1000',
    operators.multiply(1000n, 1000n)
)

// Test 6: Float precision edge
await test(
    6,
    "float precision",
    '0.1 * 0.1',
    operators.multiply(0.1, 0.1)
)

// Test 7: Commutative property
await test(
    7,
    "commutativity",
    '7 * 13',
    operators.multiply(13n, 7n)
)

printSummary()
