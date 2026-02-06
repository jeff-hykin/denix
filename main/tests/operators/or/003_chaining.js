#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.or - Chaining\n")

// Test 1: Three false values
await test(
    1,
    "three falses",
    'false || false || false',
    operators.or(operators.or(false, false), false)
)

// Test 2: Four false values
await test(
    2,
    "four falses",
    'false || false || false || false',
    operators.or(operators.or(operators.or(false, false), false), false)
)

// Test 3: First true in chain
await test(
    3,
    "first is true",
    'true || false || false',
    operators.or(operators.or(true, false), false)
)

// Test 4: Middle true in chain
await test(
    4,
    "middle is true",
    'false || true || false',
    operators.or(operators.or(false, true), false)
)

// Test 5: Last true in chain
await test(
    5,
    "last is true",
    'false || false || true',
    operators.or(operators.or(false, false), true)
)

// Test 6: Multiple true values
await test(
    6,
    "multiple trues",
    'true || true || false || true',
    operators.or(operators.or(operators.or(true, true), false), true)
)

// Test 7: Long chain of falses
await test(
    7,
    "five falses",
    'false || false || false || false || false',
    operators.or(
        operators.or(
            operators.or(
                operators.or(false, false),
                false
            ),
            false
        ),
        false
    )
)

printSummary()
