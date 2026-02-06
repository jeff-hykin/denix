#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.sort - Intermediate tests\n")

// Test 1: Sort with reverse comparison
await test(
    1,
    "sort with reversed comparison",
    'builtins.sort (a: b: !(a < b)) [5 2 8 1 9 3]',
    builtins.sort((a) => (b) => !(a < b))([5n, 2n, 8n, 1n, 9n, 3n])
)

// Test 2: Sort strings case-insensitively (simulated)
await test(
    2,
    "sort strings by length then alphabetically",
    'builtins.sort (a: b: let la = builtins.stringLength a; lb = builtins.stringLength b; in if la == lb then a < b else la < lb) ["hi" "hello" "a" "world" "an"]',
    builtins.sort((a) => (b) => {
        const la = builtins.stringLength(a)
        const lb = builtins.stringLength(b)
        return la == lb ? a < b : la < lb
    })(["hi", "hello", "a", "world", "an"])
)

// Test 3: Sort negative numbers
await test(
    3,
    "sort list with negative numbers",
    'builtins.sort builtins.lessThan [-5 3 -1 0 -10 7 -3]',
    builtins.sort(builtins.lessThan)([-5n, 3n, -1n, 0n, -10n, 7n, -3n])
)

// Test 4: Sort by multiple criteria
await test(
    4,
    "sort attrsets by multiple attributes",
    'builtins.sort (a: b: if a.priority == b.priority then a.name < b.name else a.priority < b.priority) [{name = "c"; priority = 2;} {name = "a"; priority = 1;} {name = "b"; priority = 1;} {name = "d"; priority = 2;}]',
    builtins.sort((a) => (b) =>
        a.priority == b.priority ? a.name < b.name : a.priority < b.priority
    )([
        { name: "c", priority: 2n },
        { name: "a", priority: 1n },
        { name: "b", priority: 1n },
        { name: "d", priority: 2n }
    ])
)

// Test 5: Sort with computed values
await test(
    5,
    "sort by computed difference from target",
    'builtins.sort (a: b: let diff_a = if a > 50 then a - 50 else 50 - a; diff_b = if b > 50 then b - 50 else 50 - b; in diff_a < diff_b) [60 30 55 45 80 20]',
    builtins.sort((a) => (b) => {
        const diff_a = a > 50n ? a - 50n : 50n - a
        const diff_b = b > 50n ? b - 50n : 50n - b
        return diff_a < diff_b
    })([60n, 30n, 55n, 45n, 80n, 20n])
)

// Test 6: Sort by modulo result
await test(
    6,
    "sort by remainder when divided by 3",
    'builtins.sort (a: b: let ma = builtins.mod a 3; mb = builtins.mod b 3; in if ma == mb then a < b else ma < mb) [10 11 12 13 14 15 16]',
    builtins.sort((a) => (b) => {
        const ma = builtins.mod(a)(3n)
        const mb = builtins.mod(b)(3n)
        return ma == mb ? a < b : ma < mb
    })([10n, 11n, 12n, 13n, 14n, 15n, 16n])
)

// Test 7: Sort lists by sum of elements
await test(
    7,
    "sort lists by their sum",
    'builtins.sort (a: b: builtins.foldl\' builtins.add 0 a < builtins.foldl\' builtins.add 0 b) [[3 1] [2] [1 1 1] [5]]',
    builtins.sort((a) => (b) =>
        builtins["foldl'"](builtins.add)(0n)(a) < builtins["foldl'"](builtins.add)(0n)(b)
    )([[3n, 1n], [2n], [1n, 1n, 1n], [5n]])
)

// Test 8: Sort with division comparison
await test(
    8,
    "sort by division result (descending)",
    'builtins.sort (a: b: b / 10 < a / 10) [15 42 8 103 55 99]',
    builtins.sort((a) => (b) => b / 10n < a / 10n)([15n, 42n, 8n, 103n, 55n, 99n])
)

// Test 9: Sort maintaining stability for equal elements
await test(
    9,
    "sort with many equal elements",
    'builtins.sort (a: b: a.x < b.x) [{x = 2; y = "a";} {x = 1; y = "b";} {x = 2; y = "c";} {x = 1; y = "d";} {x = 2; y = "e";}]',
    builtins.sort((a) => (b) => a.x < b.x)([
        { x: 2n, y: "a" },
        { x: 1n, y: "b" },
        { x: 2n, y: "c" },
        { x: 1n, y: "d" },
        { x: 2n, y: "e" }
    ])
)

// Test 10: Sort by nested attribute
await test(
    10,
    "sort by nested attribute value",
    'builtins.sort (a: b: a.data.score < b.data.score) [{data = {score = 85;}; } {data = {score = 92;}; } {data = {score = 78;}; }]',
    builtins.sort((a) => (b) => a.data.score < b.data.score)([
        { data: { score: 85n } },
        { data: { score: 92n } },
        { data: { score: 78n } }
    ])
)

printSummary()
