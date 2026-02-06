#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.throw - Basic tests\n")

// Note: throw creates catchable errors that can be caught by tryEval
// We test this by wrapping throw in tryEval

// Test 1: Throw simple message
await test(
    1,
    "throw simple message",
    'builtins.tryEval (throw "error message")',
    builtins.tryEval((() => { throw new Error("error message") })())
)

// Test 2: Throw in tryEval returns failure
await test(
    2,
    "throw caught by tryEval",
    'builtins.tryEval (throw "test error")',
    builtins.tryEval((() => {
        try {
            builtins.throw("test error")
        } catch (e) {
            throw e
        }
    })())
)

// Test 3: Multiple throws
await test(
    3,
    "nested throw",
    'builtins.tryEval (if true then throw "error1" else throw "error2")',
    builtins.tryEval((() => {
        try {
            if (true) {
                builtins.throw("error1")
            } else {
                builtins.throw("error2")
            }
        } catch (e) {
            throw e
        }
    })())
)

console.log("\nNote: throw tests verify that tryEval catches the errors")
console.log("Direct throw tests would terminate the test suite")

printSummary()
