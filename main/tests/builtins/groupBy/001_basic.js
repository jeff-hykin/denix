#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.groupBy - Basic tests\n")

// Test 1: Simple grouping by string length
await test(
    1,
    "group strings by their length",
    'builtins.groupBy (s: builtins.toString (builtins.stringLength s)) ["a" "ab" "abc" "ab" "a"]',
    builtins.groupBy((s) => builtins.toString(BigInt(builtins.stringLength(s))))(["a", "ab", "abc", "ab", "a"])
)

// Test 2: Group numbers by even/odd
await test(
    2,
    "group numbers by even/odd",
    'builtins.groupBy (x: if x == x / 2 * 2 then "even" else "odd") [1 2 3 4 5 6]',
    builtins.groupBy((x) => x == x / 2n * 2n ? "even" : "odd")([1n, 2n, 3n, 4n, 5n, 6n])
)

// Test 3: Empty list
await test(
    3,
    "empty list produces empty attrset",
    'builtins.groupBy (x: "group") []',
    builtins.groupBy((x) => "group")([])
)

// Test 4: All items in same group
await test(
    4,
    "all items grouped together",
    'builtins.groupBy (x: "all") [1 2 3]',
    builtins.groupBy((x) => "all")([1n, 2n, 3n])
)

// Test 5: Each item in different group
await test(
    5,
    "each item in its own group",
    'builtins.groupBy builtins.toString [1 2 3]',
    builtins.groupBy(builtins.toString)([1n, 2n, 3n])
)

// Test 6: Group by first character
await test(
    6,
    "group strings by first character",
    'builtins.groupBy (s: builtins.substring 0 1 s) ["apple" "apricot" "banana" "blueberry" "cherry"]',
    builtins.groupBy((s) => builtins.substring(0)(1)(s))(["apple", "apricot", "banana", "blueberry", "cherry"])
)

// Test 7: Group attrsets by attribute value
await test(
    7,
    "group attrsets by attribute value",
    'builtins.groupBy (x: x.category) [{category = "fruit"; name = "apple";} {category = "vegetable"; name = "carrot";} {category = "fruit"; name = "banana";}]',
    builtins.groupBy((x) => x.category)([
        { category: "fruit", name: "apple" },
        { category: "vegetable", name: "carrot" },
        { category: "fruit", name: "banana" }
    ])
)

// Test 8: Group with numeric keys
await test(
    8,
    "group by modulo operation",
    'builtins.groupBy (x: builtins.toString (builtins.mod x 3)) [0 1 2 3 4 5 6 7 8 9]',
    builtins.groupBy((x) => builtins.toString(builtins.mod(x)(3n)))([0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n])
)

// Test 9: Preserve order within groups
await test(
    9,
    "items maintain order within groups",
    'builtins.groupBy (x: if x < 5 then "small" else "large") [8 2 9 1 6 3]',
    builtins.groupBy((x) => x < 5n ? "small" : "large")([8n, 2n, 9n, 1n, 6n, 3n])
)

// Test 10: Group with boolean-derived keys
await test(
    10,
    "group by boolean condition converted to string",
    'builtins.groupBy (x: builtins.toString (x > 5)) [1 6 3 8 4 9 2]',
    builtins.groupBy((x) => builtins.toString(x > 5n))([1n, 6n, 3n, 8n, 4n, 9n, 2n])
)

printSummary()
