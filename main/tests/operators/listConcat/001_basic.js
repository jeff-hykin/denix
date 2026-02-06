#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.listConcat - Basic tests\n")

// Test 1: Simple list concatenation
await test(
    1,
    "concatenate two simple lists",
    '[1 2 3] ++ [4 5 6]',
    operators.listConcat([1n, 2n, 3n], [4n, 5n, 6n])
)

// Test 2: Empty list on left
await test(
    2,
    "empty list on left",
    '[] ++ [1 2 3]',
    operators.listConcat([], [1n, 2n, 3n])
)

// Test 3: Empty list on right
await test(
    3,
    "empty list on right",
    '[1 2 3] ++ []',
    operators.listConcat([1n, 2n, 3n], [])
)

// Test 4: Both empty lists
await test(
    4,
    "both empty lists",
    '[] ++ []',
    operators.listConcat([], [])
)

// Test 5: String lists
await test(
    5,
    "concatenate string lists",
    '["a" "b"] ++ ["c" "d"]',
    operators.listConcat(["a", "b"], ["c", "d"])
)

// Test 6: Mixed type elements
await test(
    6,
    "mixed types in lists",
    '[1 "two" true] ++ [false "four" 5]',
    operators.listConcat([1n, "two", true], [false, "four", 5n])
)

// Test 7: Nested lists
await test(
    7,
    "nested lists",
    '[[1 2] [3 4]] ++ [[5 6]]',
    operators.listConcat([[1n, 2n], [3n, 4n]], [[5n, 6n]])
)

printSummary()
