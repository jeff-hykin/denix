#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.zipAttrsWith - Basic tests\n")

// Test 1: Simple merge with concatenation
await test(
    1,
    "merge attrsets by concatenating values",
    'builtins.zipAttrsWith (name: values: values) [{a = 1;} {a = 2;} {a = 3;}]',
    builtins.zipAttrsWith((name) => (values) => values)([
        { a: 1n },
        { a: 2n },
        { a: 3n }
    ])
)

// Test 2: Empty list
await test(
    2,
    "zip empty list of attrsets",
    'builtins.zipAttrsWith (name: values: values) []',
    builtins.zipAttrsWith((name) => (values) => values)([])
)

// Test 3: Single attrset
await test(
    3,
    "zip single attrset",
    'builtins.zipAttrsWith (name: values: values) [{a = 1; b = 2;}]',
    builtins.zipAttrsWith((name) => (values) => values)([{ a: 1n, b: 2n }])
)

// Test 4: Different attributes
await test(
    4,
    "merge attrsets with different attributes",
    'builtins.zipAttrsWith (name: values: values) [{a = 1;} {b = 2;} {c = 3;}]',
    builtins.zipAttrsWith((name) => (values) => values)([
        { a: 1n },
        { b: 2n },
        { c: 3n }
    ])
)

// Test 5: Overlapping attributes
await test(
    5,
    "merge attrsets with overlapping attributes",
    'builtins.zipAttrsWith (name: values: values) [{a = 1; b = 2;} {b = 3; c = 4;}]',
    builtins.zipAttrsWith((name) => (values) => values)([
        { a: 1n, b: 2n },
        { b: 3n, c: 4n }
    ])
)

// Test 6: Sum values
await test(
    6,
    "merge by summing values",
    'builtins.zipAttrsWith (name: values: builtins.foldl\' builtins.add 0 values) [{a = 1; b = 2;} {a = 3; b = 4;}]',
    builtins.zipAttrsWith((name) => (values) => builtins["foldl'"](builtins.add)(0n)(values))([
        { a: 1n, b: 2n },
        { a: 3n, b: 4n }
    ])
)

// Test 7: Use attribute name in function
await test(
    7,
    "use attribute name to prefix values",
    'builtins.zipAttrsWith (name: values: builtins.map (v: "${name}_${builtins.toString v}") values) [{a = 1;} {a = 2; b = 3;}]',
    builtins.zipAttrsWith((name) => (values) => builtins.map((v) => `${name}_${builtins.toString(v)}`)(values))([
        { a: 1n },
        { a: 2n, b: 3n }
    ])
)

// Test 8: Count occurrences
await test(
    8,
    "count how many times each attribute appears",
    'builtins.zipAttrsWith (name: values: builtins.length values) [{a = 1; b = 2;} {a = 3;} {a = 4; c = 5;}]',
    builtins.zipAttrsWith((name) => (values) => BigInt(builtins.length(values)))([
        { a: 1n, b: 2n },
        { a: 3n },
        { a: 4n, c: 5n }
    ])
)

// Test 9: Merge lists
await test(
    9,
    "merge attrsets with list values",
    'builtins.zipAttrsWith (name: values: builtins.concatLists values) [{a = [1 2];} {a = [3]; b = [4];}]',
    builtins.zipAttrsWith((name) => (values) => builtins.concatLists(values))([
        { a: [1n, 2n] },
        { a: [3n], b: [4n] }
    ])
)

// Test 10: Complex merge with multiple attrsets
await test(
    10,
    "merge multiple attrsets with various attributes",
    'builtins.zipAttrsWith (name: values: values) [{a = 1; b = 2;} {b = 3; c = 4;} {a = 5; c = 6; d = 7;}]',
    builtins.zipAttrsWith((name) => (values) => values)([
        { a: 1n, b: 2n },
        { b: 3n, c: 4n },
        { a: 5n, c: 6n, d: 7n }
    ])
)

printSummary()
