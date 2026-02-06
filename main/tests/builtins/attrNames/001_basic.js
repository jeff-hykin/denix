#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.attrNames - Basic tests\n")

// Test 1: Simple attrset
await test(
    1,
    "get attribute names from simple attrset",
    'builtins.attrNames {a = 1; b = 2; c = 3;}',
    builtins.attrNames({ a: 1n, b: 2n, c: 3n })
)

// Test 2: Empty attrset
await test(
    2,
    "get attribute names from empty attrset",
    'builtins.attrNames {}',
    builtins.attrNames({})
)

// Test 3: Single attribute
await test(
    3,
    "get attribute names from single attribute",
    'builtins.attrNames {foo = "bar";}',
    builtins.attrNames({ foo: "bar" })
)

// Test 4: Names are sorted
await test(
    4,
    "attribute names are returned sorted",
    'builtins.attrNames {z = 1; a = 2; m = 3;}',
    builtins.attrNames({ z: 1n, a: 2n, m: 3n })
)

// Test 5: Different value types
await test(
    5,
    "attribute names with different value types",
    'builtins.attrNames {str = "hello"; num = 42; bool = true; list = [1 2]; set = {};}',
    builtins.attrNames({ str: "hello", num: 42n, bool: true, list: [1n, 2n], set: {} })
)

// Test 6: Nested attrsets (only top level)
await test(
    6,
    "only get top-level attribute names",
    'builtins.attrNames {a = {b = {c = 1;};}; d = 2;}',
    builtins.attrNames({ a: { b: { c: 1n } }, d: 2n })
)

// Test 7: Numeric-like string keys
await test(
    7,
    "attribute names that look like numbers",
    'builtins.attrNames {"1" = "a"; "2" = "b"; "10" = "c";}',
    builtins.attrNames({ "1": "a", "2": "b", "10": "c" })
)

// Test 8: Special characters in names
await test(
    8,
    "attribute names with dashes and underscores",
    'builtins.attrNames {foo-bar = 1; baz_qux = 2; hello-world_123 = 3;}',
    builtins.attrNames({ "foo-bar": 1n, "baz_qux": 2n, "hello-world_123": 3n })
)

// Test 9: Many attributes
await test(
    9,
    "attribute names from larger attrset",
    'builtins.attrNames {a = 1; b = 2; c = 3; d = 4; e = 5; f = 6; g = 7; h = 8;}',
    builtins.attrNames({ a: 1n, b: 2n, c: 3n, d: 4n, e: 5n, f: 6n, g: 7n, h: 8n })
)

// Test 10: Mixed case names (sorted lexicographically)
await test(
    10,
    "attribute names with mixed case",
    'builtins.attrNames {Apple = 1; banana = 2; Cherry = 3; date = 4;}',
    builtins.attrNames({ Apple: 1n, banana: 2n, Cherry: 3n, date: 4n })
)

printSummary()
