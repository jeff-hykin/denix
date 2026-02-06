#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.deepSeq - Basic tests\n")

// Test 1: Simple value
await test(
    1,
    "simple value",
    'builtins.deepSeq 1 42',
    builtins.deepSeq(1n)(42n)
)

// Test 2: Nested attrset
await test(
    2,
    "nested attrset",
    'builtins.deepSeq {a={b={c=1;};};} "result"',
    builtins.deepSeq({ a: { b: { c: 1n } } })("result")
)

// Test 3: Nested list
await test(
    3,
    "nested list",
    'builtins.deepSeq [[1 2] [3 4]] 99',
    builtins.deepSeq([[1n, 2n], [3n, 4n]])(99n)
)

// Test 4: Mixed nesting
await test(
    4,
    "mixed nesting",
    'builtins.deepSeq {x=[1 {y=2;}];} "done"',
    builtins.deepSeq({ x: [1n, { y: 2n }] })("done")
)

// Test 5: Empty structures
await test(
    5,
    "empty structures",
    'builtins.deepSeq {a=[]; b={};} "empty"',
    builtins.deepSeq({ a: [], b: {} })("empty")
)

printSummary()
