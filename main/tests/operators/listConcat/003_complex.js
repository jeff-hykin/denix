#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.listConcat - Complex scenarios\n")

// Test 1: Lists with deeply nested structures
await test(
    1,
    "deeply nested structures",
    '[[1 [2 [3]]]] ++ [[4 [5 [6]]]]',
    operators.listConcat([[1n, [2n, [3n]]]], [[4n, [5n, [6n]]]])
)

// Test 2: Lists with multiple attribute sets
await test(
    2,
    "multiple attribute sets",
    '[{name="alice"; age=30;} {name="bob"; age=25;}] ++ [{name="charlie"; age=35;}]',
    operators.listConcat(
        [{name: "alice", age: 30n}, {name: "bob", age: 25n}],
        [{name: "charlie", age: 35n}]
    )
)

// Test 3: Mixed nested lists and values
await test(
    3,
    "mixed nested lists",
    '[1 [2 3] 4] ++ [5 [6 7] 8]',
    operators.listConcat([1n, [2n, 3n], 4n], [5n, [6n, 7n], 8n])
)

// Test 4: Lists with string interpolation results
await test(
    4,
    "lists with interpolated strings",
    '["hello" "world"] ++ ["foo" "bar"]',
    operators.listConcat(["hello", "world"], ["foo", "bar"])
)

// Test 5: Lists preserving order
await test(
    5,
    "order preservation",
    '[9 8 7 6 5] ++ [4 3 2 1 0]',
    operators.listConcat([9n, 8n, 7n, 6n, 5n], [4n, 3n, 2n, 1n, 0n])
)

// Test 6: Lists with duplicate values
await test(
    6,
    "lists with duplicates",
    '[1 1 2 2] ++ [2 2 3 3]',
    operators.listConcat([1n, 1n, 2n, 2n], [2n, 2n, 3n, 3n])
)

printSummary()
