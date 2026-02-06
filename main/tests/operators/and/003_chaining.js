#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.and - Chaining\n")

// Test 1: Three true values
await test(
    1,
    "three trues",
    'true && true && true',
    operators.and(operators.and(true, true), true)
)

// Test 2: Four true values
await test(
    2,
    "four trues",
    'true && true && true && true',
    operators.and(operators.and(operators.and(true, true), true), true)
)

// Test 3: First false in chain
await test(
    3,
    "first is false",
    'false && true && true',
    operators.and(operators.and(false, true), true)
)

// Test 4: Middle false in chain
await test(
    4,
    "middle is false",
    'true && false && true',
    operators.and(operators.and(true, false), true)
)

// Test 5: Last false in chain
await test(
    5,
    "last is false",
    'true && true && false',
    operators.and(operators.and(true, true), false)
)

// Test 6: Multiple false values
await test(
    6,
    "multiple falses",
    'false && false && true && false',
    operators.and(operators.and(operators.and(false, false), true), false)
)

// Test 7: Long chain of trues
await test(
    7,
    "five trues",
    'true && true && true && true && true',
    operators.and(
        operators.and(
            operators.and(
                operators.and(true, true),
                true
            ),
            true
        ),
        true
    )
)

printSummary()
