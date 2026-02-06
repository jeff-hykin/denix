#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.listConcat - Associativity\n")

// Test 1: Right associative chain
await test(
    1,
    "right-associated triple concat",
    '[1] ++ ([2] ++ [3])',
    operators.listConcat([1n], operators.listConcat([2n], [3n]))
)

// Test 2: Left associative chain
await test(
    2,
    "left-associated triple concat",
    '([1] ++ [2]) ++ [3]',
    operators.listConcat(operators.listConcat([1n], [2n]), [3n])
)

// Test 3: Four list concatenation
await test(
    3,
    "four lists left-to-right",
    '(([1] ++ [2]) ++ [3]) ++ [4]',
    operators.listConcat(
        operators.listConcat(
            operators.listConcat([1n], [2n]),
            [3n]
        ),
        [4n]
    )
)

// Test 4: Nested operations
await test(
    4,
    "nested list concatenations",
    '[[1] ++ [2]] ++ [[3] ++ [4]]',
    operators.listConcat(
        [operators.listConcat([1n], [2n])],
        [operators.listConcat([3n], [4n])]
    )
)

// Test 5: Multiple empty list concatenations
await test(
    5,
    "multiple empties",
    '([] ++ []) ++ ([] ++ [1])',
    operators.listConcat(
        operators.listConcat([], []),
        operators.listConcat([], [1n])
    )
)

// Test 6: Complex nested with values
await test(
    6,
    "complex associative chain",
    '([1 2] ++ [3 4]) ++ ([5 6] ++ [7 8])',
    operators.listConcat(
        operators.listConcat([1n, 2n], [3n, 4n]),
        operators.listConcat([5n, 6n], [7n, 8n])
    )
)

printSummary()
