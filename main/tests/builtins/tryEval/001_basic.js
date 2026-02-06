#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.tryEval - Basic tests\n")

// Test 1: Successful evaluation
await test(
    1,
    "successful evaluation",
    'builtins.tryEval 42',
    builtins.tryEval(42n)
)

// Test 2: String value
await test(
    2,
    "string value",
    'builtins.tryEval "hello"',
    builtins.tryEval("hello")
)

// Test 3: Attrset
await test(
    4,
    "attrset value",
    'builtins.tryEval {x=1; y=2;}',
    builtins.tryEval({ x: 1n, y: 2n })
)

// Test 5: List
await test(
    5,
    "list value",
    'builtins.tryEval [1 2 3]',
    builtins.tryEval([1n, 2n, 3n])
)

printSummary()
