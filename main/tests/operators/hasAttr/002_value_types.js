#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.hasAttr - Different value types\n")

// Test 1: Integer value
await test(
    1,
    "integer value",
    '{x=42;} ? x',
    operators.hasAttr({x: 42n}, "x")
)

// Test 2: String value
await test(
    2,
    "string value",
    '{name="Alice";} ? name',
    operators.hasAttr({name: "Alice"}, "name")
)

// Test 3: Boolean value
await test(
    3,
    "boolean value",
    '{flag=true;} ? flag',
    operators.hasAttr({flag: true}, "flag")
)

// Test 4: List value
await test(
    4,
    "list value",
    '{items=[1 2 3];} ? items',
    operators.hasAttr({items: [1n, 2n, 3n]}, "items")
)

// Test 5: Nested attrset value
await test(
    5,
    "nested attrset",
    '{nested={x=1;};} ? nested',
    operators.hasAttr({nested: {x: 1n}}, "nested")
)

// Test 6: Float value
await test(
    6,
    "float value",
    '{pi=3.14;} ? pi',
    operators.hasAttr({pi: 3.14}, "pi")
)

// Test 7: Empty list value
await test(
    7,
    "empty list value",
    '{empty=[];} ? empty',
    operators.hasAttr({empty: []}, "empty")
)

printSummary()
