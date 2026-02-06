#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.listConcat - Edge cases\n")

// Test 1: Single element lists
await test(
    1,
    "single element lists",
    '[1] ++ [2]',
    operators.listConcat([1n], [2n])
)

// Test 2: Long lists
await test(
    2,
    "longer lists",
    '[1 2 3 4 5 6 7 8 9 10] ++ [11 12 13 14 15]',
    operators.listConcat([1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n, 10n], [11n, 12n, 13n, 14n, 15n])
)

// Test 3: Lists with null
await test(
    3,
    "lists with null values",
    '[1 null 3] ++ [null 5]',
    operators.listConcat([1n, null, 3n], [null, 5n])
)

// Test 4: Lists with attribute sets
await test(
    4,
    "lists with attribute sets",
    '[{a=1;}] ++ [{b=2;}]',
    operators.listConcat([{a: 1n}], [{b: 2n}])
)

// Test 5: Chained concatenations (left-associative)
await test(
    5,
    "multiple concatenations",
    '[1] ++ [2] ++ [3]',
    operators.listConcat(operators.listConcat([1n], [2n]), [3n])
)

// Test 6: Lists with booleans
await test(
    6,
    "lists with boolean values",
    '[true false] ++ [false true]',
    operators.listConcat([true, false], [false, true])
)

printSummary()
