#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const runtime = await import(runtimePath)

// Note: nixRepr is an internal helper function, not a builtin
// We'll need to test it differently or skip if not exported
// For now, creating basic structure

console.log("Testing nixRepr - Internal helper\n")

// nixRepr is used internally for string representation
// It's called by nixRepr in runtime.js around line 105-110
// We can test it indirectly through error messages or other builtins

console.log("Note: nixRepr is an internal helper function")
console.log("Testing would require it to be exported from runtime.js")
console.log("Skipping tests for now - consider exporting nixRepr for testing")

printSummary()
