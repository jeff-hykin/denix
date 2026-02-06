#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.equal - Lists\n")

// Test 1: Equal lists
await test(
    1,
    "equal lists",
    '[1 2 3] == [1 2 3]',
    operators.equal([1n, 2n, 3n], [1n, 2n, 3n])
)

// Test 2: Different lists
await test(
    2,
    "different lists",
    '[1 2 3] == [4 5 6]',
    operators.equal([1n, 2n, 3n], [4n, 5n, 6n])
)

// Test 3: Different length lists
await test(
    3,
    "different lengths",
    '[1 2] == [1 2 3]',
    operators.equal([1n, 2n], [1n, 2n, 3n])
)

// Test 4: Empty lists
await test(
    4,
    "empty lists",
    '[] == []',
    operators.equal([], [])
)

// Test 5: Empty vs non-empty
await test(
    5,
    "empty vs non-empty",
    '[] == [1]',
    operators.equal([], [1n])
)

// Test 6: Nested lists equal
await test(
    6,
    "nested lists equal",
    '[[1 2] [3 4]] == [[1 2] [3 4]]',
    operators.equal([[1n, 2n], [3n, 4n]], [[1n, 2n], [3n, 4n]])
)

// Test 7: Nested lists different
await test(
    7,
    "nested lists different",
    '[[1 2]] == [[3 4]]',
    operators.equal([[1n, 2n]], [[3n, 4n]])
)

printSummary()
