#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.negate - Boolean expressions\n")

// Test 1: Negate equality result
await test(
    1,
    "negate equality",
    '!(5 == 5)',
    operators.negate(5n == 5n)
)

// Test 2: Negate inequality result
await test(
    2,
    "negate inequality",
    '!(5 != 3)',
    operators.negate(5n != 3n)
)

// Test 3: Negate greater than
await test(
    3,
    "negate greater than",
    '!(10 > 5)',
    operators.negate(10n > 5n)
)

// Test 4: Negate less than
await test(
    4,
    "negate less than",
    '!(3 < 7)',
    operators.negate(3n < 7n)
)

// Test 5: Negate and expression
await test(
    5,
    "negate and",
    '!(true && false)',
    operators.negate(true && false)
)

// Test 6: Negate or expression
await test(
    6,
    "negate or",
    '!(true || false)',
    operators.negate(true || false)
)

// Test 7: Complex nested negation
await test(
    7,
    "complex negation",
    '!(!(true && false) || true)',
    operators.negate((operators.negate(true && false) || true))
)

printSummary()
