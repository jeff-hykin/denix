#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.toXML - Basic tests\n")

// Test 1: Simple integer
await test(
    1,
    "convert integer to XML",
    'builtins.toXML 42',
    builtins.toXML(42n)
)

// Test 2: Simple string
await test(
    2,
    "convert string to XML",
    'builtins.toXML "hello"',
    builtins.toXML("hello")
)

// Test 3: Boolean true
await test(
    3,
    "convert true to XML",
    'builtins.toXML true',
    builtins.toXML(true)
)

// Test 4: Boolean false
await test(
    4,
    "convert false to XML",
    'builtins.toXML false',
    builtins.toXML(false)
)

// Test 5: Null
await test(
    5,
    "convert null to XML",
    'builtins.toXML null',
    builtins.toXML(null)
)

// Test 6: Empty list
await test(
    6,
    "convert empty list to XML",
    'builtins.toXML []',
    builtins.toXML([])
)

// Test 7: Simple list
await test(
    7,
    "convert list to XML",
    'builtins.toXML [1 2 3]',
    builtins.toXML([1n, 2n, 3n])
)

// Test 8: Empty attrset
await test(
    8,
    "convert empty attrset to XML",
    'builtins.toXML {}',
    builtins.toXML({})
)

// Test 9: Simple attrset
await test(
    9,
    "convert simple attrset to XML",
    'builtins.toXML {name = "Alice"; age = 30;}',
    builtins.toXML({ name: "Alice", age: 30n })
)

// Test 10: Nested structure
await test(
    10,
    "convert nested structure to XML",
    'builtins.toXML {users = [{name = "Alice";} {name = "Bob";}];}',
    builtins.toXML({ users: [{ name: "Alice" }, { name: "Bob" }] })
)

printSummary()
