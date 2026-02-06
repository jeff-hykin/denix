#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.traceVerbose - Basic tests\n")

// Note: traceVerbose only prints if NIX_TRACE_VERBOSE is set
// It always returns the second argument regardless

// Test 1: Simple trace
await test(
    1,
    "returns second argument",
    'builtins.traceVerbose "debug" 42',
    builtins.traceVerbose("debug")(42n)
)

// Test 2: With null
await test(
    2,
    "with null",
    'builtins.traceVerbose null "result"',
    builtins.traceVerbose(null)("result")
)

// Test 3: With number
await test(
    3,
    "with number message",
    'builtins.traceVerbose 123 "value"',
    builtins.traceVerbose(123n)("value")
)

// Test 4: With attrset result
await test(
    4,
    "with attrset result",
    'builtins.traceVerbose "msg" {x=1; y=2;}',
    builtins.traceVerbose("msg")({ x: 1n, y: 2n })
)

// Test 5: With list result
await test(
    5,
    "with list result",
    'builtins.traceVerbose "list" [1 2 3]',
    builtins.traceVerbose("list")([1n, 2n, 3n])
)

printSummary()
