#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.fromTOML - Basic tests\n")

// Test 1: Simple key-value
await test(
    1,
    "simple key-value",
    'builtins.fromTOML "key = \\"value\\""',
    builtins.fromTOML('key = "value"')
)

// Test 2: Integer
await test(
    2,
    "integer value",
    'builtins.fromTOML "number = 42"',
    builtins.fromTOML('number = 42')
)

// Test 3: Boolean
await test(
    3,
    "boolean values",
    'builtins.fromTOML "enabled = true\\ndisabled = false"',
    builtins.fromTOML('enabled = true\ndisabled = false')
)

// Test 4: Array
await test(
    4,
    "array value",
    'builtins.fromTOML "items = [1, 2, 3]"',
    builtins.fromTOML('items = [1, 2, 3]')
)

// Test 5: Nested table
await test(
    5,
    "nested table",
    'builtins.fromTOML "[section]\\nkey = \\"value\\""',
    builtins.fromTOML('[section]\nkey = "value"')
)

// Test 6: Multiple types
await test(
    6,
    "multiple types",
    'builtins.fromTOML "name = \\"test\\"\\ncount = 10\\nenabled = true"',
    builtins.fromTOML('name = "test"\ncount = 10\nenabled = true')
)

// Test 7: String array
await test(
    7,
    "string array",
    'builtins.fromTOML "tags = [\\"a\\", \\"b\\", \\"c\\"]"',
    builtins.fromTOML('tags = ["a", "b", "c"]')
)

// Test 8: Float
await test(
    8,
    "float value",
    'builtins.fromTOML "pi = 3.14"',
    builtins.fromTOML('pi = 3.14')
)

// Test 9: Empty
await test(
    9,
    "empty TOML",
    'builtins.fromTOML ""',
    builtins.fromTOML('')
)

// Test 10: Dotted keys
await test(
    10,
    "dotted keys",
    'builtins.fromTOML "a.b.c = 1"',
    builtins.fromTOML('a.b.c = 1')
)

printSummary()
