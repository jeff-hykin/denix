#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.attrNames - Intermediate tests\n")

// Test 1: Attrset with quoted attribute names
await test(
    1,
    "attribute names with special characters",
    'builtins.attrNames {"foo-bar" = 1; "baz.qux" = 2; "hello world" = 3;}',
    builtins.attrNames({ "foo-bar": 1n, "baz.qux": 2n, "hello world": 3n })
)

// Test 2: Large attrset (verify sorting)
await test(
    2,
    "many attributes verify correct sorting",
    'builtins.attrNames {z = 1; y = 2; x = 3; w = 4; v = 5; u = 6; t = 7; s = 8; r = 9; q = 10;}',
    builtins.attrNames({ z: 1n, y: 2n, x: 3n, w: 4n, v: 5n, u: 6n, t: 7n, s: 8n, r: 9n, q: 10n })
)

// Test 3: Attrset with numeric-like keys (sorted as strings)
await test(
    3,
    "numeric string keys sorted lexicographically",
    'builtins.attrNames {"1" = "a"; "10" = "b"; "2" = "c"; "20" = "d";}',
    builtins.attrNames({ "1": "a", "10": "b", "2": "c", "20": "d" })
)

// Test 4: Deeply nested values (only top level)
await test(
    4,
    "nested values ignored, only top level keys",
    'builtins.attrNames {a = {b = {c = {d = 1;};};}; e = {f = 2;};}',
    builtins.attrNames({ a: { b: { c: { d: 1n } } }, e: { f: 2n } })
)

// Test 5: Attrset with null and false values
await test(
    5,
    "attribute names regardless of null/false values",
    'builtins.attrNames {a = null; b = false; c = 0; d = "";}',
    builtins.attrNames({ a: null, b: false, c: 0n, d: "" })
)

// Test 6: Mixed case and numbers
await test(
    6,
    "mixed case and numeric attribute names",
    'builtins.attrNames {A1 = 1; a2 = 2; B1 = 3; b2 = 4;}',
    builtins.attrNames({ A1: 1n, a2: 2n, B1: 3n, b2: 4n })
)

// Test 7: Attrset with underscore prefixes
await test(
    7,
    "attribute names with underscores",
    'builtins.attrNames {_private = 1; __very_private = 2; public = 3; _another = 4;}',
    builtins.attrNames({ _private: 1n, __very_private: 2n, public: 3n, _another: 4n })
)

// Test 8: Single character attribute names
await test(
    8,
    "single character attribute names",
    'builtins.attrNames {a = 1; b = 2; c = 3; d = 4; e = 5;}',
    builtins.attrNames({ a: 1n, b: 2n, c: 3n, d: 4n, e: 5n })
)

// Test 9: Attrset with function values
await test(
    9,
    "attribute names when values are functions",
    'builtins.attrNames {func1 = x: x; func2 = y: y + 1; value = 42;}',
    builtins.attrNames({ func1: (x) => x, func2: (y) => y + 1n, value: 42n })
)

// Test 10: Attrset with list and attrset values
await test(
    10,
    "attribute names with complex nested values",
    'builtins.attrNames {lists = [[1] [2]]; sets = [{a = 1;} {b = 2;}]; mixed = [{c = [3];}];}',
    builtins.attrNames({
        lists: [[1n], [2n]],
        sets: [{ a: 1n }, { b: 2n }],
        mixed: [{ c: [3n] }]
    })
)

printSummary()
