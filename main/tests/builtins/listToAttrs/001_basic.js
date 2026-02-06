#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.listToAttrs - Basic tests\n")

// Test 1: Simple conversion
await test(
    1,
    "simple list to attrs",
    'builtins.listToAttrs [{name="a"; value=1;} {name="b"; value=2;}]',
    builtins.listToAttrs([{ name: "a", value: 1n }, { name: "b", value: 2n }])
)

// Test 2: Empty list
await test(
    2,
    "empty list",
    'builtins.listToAttrs []',
    builtins.listToAttrs([])
)

// Test 3: Duplicate names (first wins)
await test(
    3,
    "duplicate names - first wins",
    'builtins.listToAttrs [{name="x"; value=1;} {name="x"; value=2;}]',
    builtins.listToAttrs([{ name: "x", value: 1n }, { name: "x", value: 2n }])
)

// Test 4: Mixed value types
await test(
    4,
    "mixed value types",
    'builtins.listToAttrs [{name="a"; value=1;} {name="b"; value="text";} {name="c"; value=true;}]',
    builtins.listToAttrs([{ name: "a", value: 1n }, { name: "b", value: "text" }, { name: "c", value: true }])
)

// Test 5: Single element
await test(
    5,
    "single element",
    'builtins.listToAttrs [{name="only"; value=42;}]',
    builtins.listToAttrs([{ name: "only", value: 42n }])
)

// Test 6: Complex values
await test(
    6,
    "attrset values",
    'builtins.listToAttrs [{name="x"; value={nested=1;};}]',
    builtins.listToAttrs([{ name: "x", value: { nested: 1n } }])
)

printSummary()
