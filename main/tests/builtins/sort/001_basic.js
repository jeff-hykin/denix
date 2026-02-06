#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.sort - Basic tests\n")

// Test 1: Sort integers ascending
await test(
    1,
    "sort integers in ascending order",
    'builtins.sort builtins.lessThan [5 2 8 1 9 3]',
    builtins.sort(builtins.lessThan)([5n, 2n, 8n, 1n, 9n, 3n])
)

// Test 2: Sort integers descending
await test(
    2,
    "sort integers in descending order",
    'builtins.sort (a: b: b < a) [5 2 8 1 9 3]',
    builtins.sort((a) => (b) => b < a)([5n, 2n, 8n, 1n, 9n, 3n])
)

// Test 3: Sort strings
await test(
    3,
    "sort strings alphabetically",
    'builtins.sort builtins.lessThan ["zebra" "apple" "mango" "banana"]',
    builtins.sort(builtins.lessThan)(["zebra", "apple", "mango", "banana"])
)

// Test 4: Empty list
await test(
    4,
    "sort empty list",
    'builtins.sort builtins.lessThan []',
    builtins.sort(builtins.lessThan)([])
)

// Test 5: Single element
await test(
    5,
    "sort single element list",
    'builtins.sort builtins.lessThan [42]',
    builtins.sort(builtins.lessThan)([42n])
)

// Test 6: Already sorted
await test(
    6,
    "sort already sorted list",
    'builtins.sort builtins.lessThan [1 2 3 4 5]',
    builtins.sort(builtins.lessThan)([1n, 2n, 3n, 4n, 5n])
)

// Test 7: Sort with custom comparator (by absolute value)
await test(
    7,
    "sort by absolute value",
    'builtins.sort (a: b: (if a < 0 then -a else a) < (if b < 0 then -b else b)) [3 -5 2 -1 4]',
    builtins.sort((a) => (b) => {
        const absA = a < 0n ? -a : a
        const absB = b < 0n ? -b : b
        return absA < absB
    })([3n, -5n, 2n, -1n, 4n])
)

// Test 8: Sort strings by length
await test(
    8,
    "sort strings by length",
    'builtins.sort (a: b: builtins.stringLength a < builtins.stringLength b) ["hi" "hello" "a" "world"]',
    builtins.sort((a) => (b) => builtins.stringLength(a) < builtins.stringLength(b))(["hi", "hello", "a", "world"])
)

// Test 9: Sort attrsets by attribute
await test(
    9,
    "sort attrsets by attribute value",
    'builtins.sort (a: b: a.age < b.age) [{name = "Alice"; age = 30;} {name = "Bob"; age = 25;} {name = "Charlie"; age = 35;}]',
    builtins.sort((a) => (b) => a.age < b.age)([
        { name: "Alice", age: 30n },
        { name: "Bob", age: 25n },
        { name: "Charlie", age: 35n }
    ])
)

// Test 10: Stable sort (equal elements maintain order)
await test(
    10,
    "sort with equal elements",
    'builtins.sort (a: b: a < b) [5 2 8 2 9 5 3]',
    builtins.sort((a) => (b) => a < b)([5n, 2n, 8n, 2n, 9n, 5n, 3n])
)

printSummary()
