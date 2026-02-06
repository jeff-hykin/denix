#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.notEqual - Lists\n")

// Test 1: Different lists
await test(
    1,
    "different lists",
    '[1 2 3] != [4 5 6]',
    operators.notEqual([1n, 2n, 3n], [4n, 5n, 6n])
)

// Test 2: Same lists
await test(
    2,
    "same lists",
    '[1 2 3] != [1 2 3]',
    operators.notEqual([1n, 2n, 3n], [1n, 2n, 3n])
)

// Test 3: Different length lists
await test(
    3,
    "different length lists",
    '[1 2] != [1 2 3]',
    operators.notEqual([1n, 2n], [1n, 2n, 3n])
)

// Test 4: Empty vs non-empty
await test(
    4,
    "empty vs non-empty list",
    '[] != [1]',
    operators.notEqual([], [1n])
)

// Test 5: Both empty
await test(
    5,
    "both empty lists",
    '[] != []',
    operators.notEqual([], [])
)

// Test 6: Nested lists - different
await test(
    6,
    "different nested lists",
    '[[1 2]] != [[3 4]]',
    operators.notEqual([[1n, 2n]], [[3n, 4n]])
)

// Test 7: Nested lists - same
await test(
    7,
    "same nested lists",
    '[[1 2]] != [[1 2]]',
    operators.notEqual([[1n, 2n]], [[1n, 2n]])
)

printSummary()
