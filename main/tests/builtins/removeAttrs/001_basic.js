#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.removeAttrs - Basic tests\n")

// Test 1: Remove single attribute
await test(
    1,
    "remove single attribute",
    'builtins.removeAttrs {x=1; y=2; z=3;} ["x"]',
    builtins.removeAttrs({ x: 1n, y: 2n, z: 3n })(["x"])
)

// Test 2: Remove multiple attributes
await test(
    2,
    "remove multiple attributes",
    'builtins.removeAttrs {x=1; y=2; z=3;} ["x" "z"]',
    builtins.removeAttrs({ x: 1n, y: 2n, z: 3n })(["x", "z"])
)

// Test 3: Remove no attributes
await test(
    3,
    "remove empty list",
    'builtins.removeAttrs {x=1; y=2;} []',
    builtins.removeAttrs({ x: 1n, y: 2n })([])
)

// Test 4: Remove non-existent attribute
await test(
    4,
    "remove non-existent attribute",
    'builtins.removeAttrs {x=1; y=2;} ["z"]',
    builtins.removeAttrs({ x: 1n, y: 2n })(["z"])
)

// Test 5: Remove from empty attrset
await test(
    5,
    "remove from empty set",
    'builtins.removeAttrs {} ["x"]',
    builtins.removeAttrs({})(["x"])
)

// Test 6: Remove all attributes
await test(
    6,
    "remove all attributes",
    'builtins.removeAttrs {x=1; y=2;} ["x" "y"]',
    builtins.removeAttrs({ x: 1n, y: 2n })(["x", "y"])
)

printSummary()
