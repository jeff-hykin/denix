#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.listConcat - Type variations\n")

// Test 1: Integer lists
await test(
    1,
    "integer lists",
    '[1 2 3] ++ [4 5 6]',
    operators.listConcat([1n, 2n, 3n], [4n, 5n, 6n])
)

// Test 2: Float lists
await test(
    2,
    "float lists",
    '[1.5 2.5] ++ [3.5 4.5]',
    operators.listConcat([1.5, 2.5], [3.5, 4.5])
)

// Test 3: String lists
await test(
    3,
    "string lists",
    '["alpha" "beta"] ++ ["gamma" "delta"]',
    operators.listConcat(["alpha", "beta"], ["gamma", "delta"])
)

// Test 4: Boolean lists
await test(
    4,
    "boolean lists",
    '[true true false] ++ [false true false]',
    operators.listConcat([true, true, false], [false, true, false])
)

// Test 5: Null in lists
await test(
    5,
    "null values",
    '[null null] ++ [null]',
    operators.listConcat([null, null], [null])
)

// Test 6: Heterogeneous lists
await test(
    6,
    "mixed types",
    '[1 "two" 3.0 true null] ++ [{a=1;} [1 2] false]',
    operators.listConcat([1n, "two", 3.0, true, null], [{a: 1n}, [1n, 2n], false])
)

printSummary()
