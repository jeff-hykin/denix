#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negative - Edge cases\n")

// Test 1: Double negation
await test(
    1,
    "double negation",
    '-(-(10))',
    operators.negative(operators.negative(10n))
)

// Test 2: Triple negation
await test(
    2,
    "triple negation",
    '-(-(-(7)))',
    operators.negative(operators.negative(operators.negative(7n)))
)

// Test 3: Negation of one
await test(
    3,
    "negate one",
    '-(1)',
    operators.negative(1n)
)

// Test 4: Negation of minus one
await test(
    4,
    "negate minus one",
    '-(-1)',
    operators.negative(-1n)
)

// Test 5: Maximum safe integer-like value
await test(
    5,
    "large safe integer",
    '-(9007199254740991)',
    operators.negative(9007199254740991n)
)

// Test 6: Negative of zero (integer)
await test(
    6,
    "negative zero int",
    '-(0)',
    operators.negative(0n)
)

// Test 7: Negative of zero (float)
await test(
    7,
    "negative zero float",
    '-(0.0)',
    operators.negative(0.0)
)

printSummary()
