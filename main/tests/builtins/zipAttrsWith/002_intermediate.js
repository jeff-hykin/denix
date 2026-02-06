#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.zipAttrsWith - Intermediate tests\n")

// Test 1: Take first value from each key
await test(
    1,
    "merge by taking first value",
    'builtins.zipAttrsWith (name: values: builtins.head values) [{a = 1; b = 2;} {a = 3; b = 4;} {a = 5;}]',
    builtins.zipAttrsWith((name) => (values) => builtins.head(values))([
        { a: 1n, b: 2n },
        { a: 3n, b: 4n },
        { a: 5n }
    ])
)

// Test 2: Take last value from each key
await test(
    2,
    "merge by taking last value",
    'builtins.zipAttrsWith (name: values: builtins.elemAt values (builtins.length values - 1)) [{a = 1;} {a = 2; b = 3;} {a = 4;}]',
    builtins.zipAttrsWith((name) => (values) => builtins.elemAt(values)(BigInt(builtins.length(values)) - 1n))([
        { a: 1n },
        { a: 2n, b: 3n },
        { a: 4n }
    ])
)

// Test 3: Multiply all values together
await test(
    3,
    "merge by multiplying values",
    'builtins.zipAttrsWith (name: values: builtins.foldl\' builtins.mul 1 values) [{a = 2; b = 3;} {a = 4; b = 5;}]',
    builtins.zipAttrsWith((name) => (values) => builtins["foldl'"](builtins.mul)(1n)(values))([
        { a: 2n, b: 3n },
        { a: 4n, b: 5n }
    ])
)

// Test 4: Find maximum value for each key
await test(
    4,
    "merge by finding maximum",
    'builtins.zipAttrsWith (name: values: builtins.foldl\' (a: b: if a > b then a else b) (builtins.head values) values) [{a = 5; b = 2;} {a = 3; b = 8;} {a = 7; b = 4;}]',
    builtins.zipAttrsWith((name) => (values) =>
        builtins["foldl'"]((a) => (b) => a > b ? a : b)(builtins.head(values))(values)
    )([
        { a: 5n, b: 2n },
        { a: 3n, b: 8n },
        { a: 7n, b: 4n }
    ])
)

// Test 5: Concatenate string values
await test(
    5,
    "merge by concatenating strings",
    'builtins.zipAttrsWith (name: values: builtins.concatStringsSep ", " values) [{a = "x"; b = "1";} {a = "y"; b = "2";}]',
    builtins.zipAttrsWith((name) => (values) => builtins.concatStringsSep(", ")(values))([
        { a: "x", b: "1" },
        { a: "y", b: "2" }
    ])
)

// Test 6: Create attrset from name and values
await test(
    6,
    "merge by creating structured result",
    'builtins.zipAttrsWith (name: values: {key = name; vals = values;}) [{a = 1;} {a = 2; b = 3;}]',
    builtins.zipAttrsWith((name) => (values) => ({ key: name, vals: values }))([
        { a: 1n },
        { a: 2n, b: 3n }
    ])
)

// Test 7: Filter and count
await test(
    7,
    "merge by counting values greater than 5",
    'builtins.zipAttrsWith (name: values: builtins.length (builtins.filter (x: x > 5) values)) [{a = 3; b = 7;} {a = 8; b = 2;} {a = 6; b = 9;}]',
    builtins.zipAttrsWith((name) => (values) =>
        BigInt(builtins.length(builtins.filter((x) => x > 5n)(values)))
    )([
        { a: 3n, b: 7n },
        { a: 8n, b: 2n },
        { a: 6n, b: 9n }
    ])
)

// Test 8: Nested lists flattening
await test(
    8,
    "merge nested lists by flattening",
    'builtins.zipAttrsWith (name: values: builtins.concatLists (builtins.concatLists values)) [{a = [[1] [2]];} {a = [[3]];}]',
    builtins.zipAttrsWith((name) => (values) =>
        builtins.concatLists(builtins.concatLists(values))
    )([
        { a: [[1n], [2n]] },
        { a: [[3n]] }
    ])
)

// Test 9: Keep only unique values
await test(
    9,
    "merge by removing duplicates with unique",
    'builtins.zipAttrsWith (name: values: builtins.sort builtins.lessThan (builtins.unique values)) [{a = 1; b = 2;} {a = 2; b = 3;} {a = 1; b = 2;}]',
    builtins.zipAttrsWith((name) => (values) =>
        builtins.sort(builtins.lessThan)(builtins.unique(values))
    )([
        { a: 1n, b: 2n },
        { a: 2n, b: 3n },
        { a: 1n, b: 2n }
    ])
)

// Test 10: Complex transformation using name
await test(
    10,
    "merge with complex name-dependent transformation",
    'builtins.zipAttrsWith (name: values: if name == "sum" then builtins.foldl\' builtins.add 0 values else values) [{sum = 1; list = 1;} {sum = 2; list = 2;} {sum = 3; list = 3;}]',
    builtins.zipAttrsWith((name) => (values) =>
        name == "sum" ? builtins["foldl'"](builtins.add)(0n)(values) : values
    )([
        { sum: 1n, list: 1n },
        { sum: 2n, list: 2n },
        { sum: 3n, list: 3n }
    ])
)

printSummary()
