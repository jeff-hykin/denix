#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.seq - Basic tests\n")

// Test 1: Returns second argument
await test(
    1,
    "returns second argument",
    'builtins.seq 1 42',
    builtins.seq(1n)(42n)
)

// Test 2: With null
await test(
    2,
    "seq with null",
    'builtins.seq null "result"',
    builtins.seq(null)("result")
)

// Test 3: With boolean
await test(
    3,
    "seq with boolean",
    'builtins.seq true 100',
    builtins.seq(true)(100n)
)

// Test 4: With attrset
await test(
    4,
    "seq with attrset",
    'builtins.seq {x=1;} "value"',
    builtins.seq({ x: 1n })("value")
)

// Test 5: With list
await test(
    5,
    "seq with list",
    'builtins.seq [1 2 3] 99',
    builtins.seq([1n, 2n, 3n])(99n)
)

printSummary()
