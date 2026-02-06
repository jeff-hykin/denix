#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.concatMap - Nested structures\n")

// Test 1: Nested lists
await test(
    1,
    "flatten nested structure",
    'builtins.concatMap (x: builtins.map (y: y * x) [1 2]) [10 20]',
    builtins.concatMap((x) => builtins.map((y) => y * x)([1n, 2n]))([10n, 20n])
)

// Test 2: Attribute extraction
await test(
    2,
    "extract and duplicate attribute",
    'builtins.concatMap (x: [x.a x.a]) [{a=1;} {a=2;}]',
    builtins.concatMap((x) => [x.a, x.a])([{ a: 1n }, { a: 2n }])
)

// Test 3: Mixed types
await test(
    3,
    "wrap different types",
    'builtins.concatMap (x: [x]) [1 "hello" true]',
    builtins.concatMap((x) => [x])([1n, "hello", true])
)

// Test 4: Triple expansion
await test(
    4,
    "expand by index value",
    'builtins.concatMap (x: builtins.genList (y: x) x) [0 1 2 3]',
    builtins.concatMap((x) => builtins.genList((y) => x)(x))([0n, 1n, 2n, 3n])
)

// Test 5: Filter and expand
await test(
    5,
    "filter evens and duplicate",
    'builtins.concatMap (x: if x / 2 * 2 == x then [x x] else []) [1 2 3 4 5 6]',
    builtins.concatMap((x) => (x / 2n * 2n == x) ? [x, x] : [])([1n, 2n, 3n, 4n, 5n, 6n])
)

printSummary()
