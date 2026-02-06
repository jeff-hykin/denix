#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.concatMap - Basic tests\n")

// Test 1: Simple doubling and flattening
await test(
    1,
    "double each element into a pair",
    'builtins.concatMap (x: [x x]) [1 2 3]',
    builtins.concatMap((x) => [x, x])([1n, 2n, 3n])
)

// Test 2: Empty list
await test(
    2,
    "empty list",
    'builtins.concatMap (x: [x x]) []',
    builtins.concatMap((x) => [x, x])([])
)

// Test 3: Map to empty lists
await test(
    3,
    "map everything to empty lists",
    'builtins.concatMap (x: []) [1 2 3]',
    builtins.concatMap((x) => [])([1n, 2n, 3n])
)

// Test 4: Variable length results
await test(
    4,
    "variable length sublists",
    'builtins.concatMap (x: if x > 2 then [x x x] else [x]) [1 2 3 4]',
    builtins.concatMap((x) => x > 2n ? [x, x, x] : [x])([1n, 2n, 3n, 4n])
)

// Test 5: String lists
await test(
    5,
    "concatenate string lists",
    'builtins.concatMap (x: [x "${x}-suffix"]) ["a" "b"]',
    builtins.concatMap((x) => [x, `${x}-suffix`])(["a", "b"])
)

printSummary()
