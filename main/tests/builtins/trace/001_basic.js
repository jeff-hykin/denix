#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.trace - Basic tests\n")

// Note: trace prints to stderr but returns the second argument
// We can only test the return value, not the stderr output

// Test 1: Simple trace
await test(
    1,
    "trace returns second argument",
    'builtins.trace "debug" 42',
    builtins.trace("debug")(42n)
)

// Test 2: Trace with null
await test(
    2,
    "trace with null",
    'builtins.trace null "result"',
    builtins.trace(null)("result")
)

// Test 3: Trace with number
await test(
    3,
    "trace with number",
    'builtins.trace 123 "value"',
    builtins.trace(123n)("value")
)

// Test 4: Trace with attrset
await test(
    4,
    "trace with attrset result",
    'builtins.trace "msg" {x=1; y=2;}',
    builtins.trace("msg")({ x: 1n, y: 2n })
)

// Test 5: Trace with list
await test(
    5,
    "trace with list result",
    'builtins.trace "list" [1 2 3]',
    builtins.trace("list")([1n, 2n, 3n])
)

// Test 6: Chained traces
await test(
    6,
    "chained traces",
    'builtins.trace "first" (builtins.trace "second" 99)',
    builtins.trace("first")(builtins.trace("second")(99n))
)

printSummary()
