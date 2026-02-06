#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.catAttrs - Intermediate tests\n")

// Test 1: Extract from attrsets with extra attributes
await test(
    1,
    "extract attribute ignoring extra attributes",
    'builtins.catAttrs "id" [{id = 1; name = "a"; extra = true;} {id = 2; other = "b";} {id = 3;}]',
    builtins.catAttrs("id")([
        { id: 1n, name: "a", extra: true },
        { id: 2n, other: "b" },
        { id: 3n }
    ])
)

// Test 2: Extract null values
await test(
    2,
    "extract null values successfully",
    'builtins.catAttrs "value" [{value = null;} {value = 1;} {value = null;}]',
    builtins.catAttrs("value")([
        { value: null },
        { value: 1n },
        { value: null }
    ])
)

// Test 3: Extract false values
await test(
    3,
    "extract false boolean values",
    'builtins.catAttrs "flag" [{flag = true;} {flag = false;} {flag = true;} {flag = false;}]',
    builtins.catAttrs("flag")([
        { flag: true },
        { flag: false },
        { flag: true },
        { flag: false }
    ])
)

// Test 4: Extract with sparse presence
await test(
    4,
    "extract from sparse list (many missing)",
    'builtins.catAttrs "x" [{a = 1;} {b = 2;} {x = 10;} {c = 3;} {d = 4;} {x = 20;}]',
    builtins.catAttrs("x")([
        { a: 1n },
        { b: 2n },
        { x: 10n },
        { c: 3n },
        { d: 4n },
        { x: 20n }
    ])
)

// Test 5: Extract deeply nested attrsets
await test(
    5,
    "extract complex nested structures",
    'builtins.catAttrs "config" [{config = {x = 1; y = 2;}; } {config = {a = 3; b = 4;}; }]',
    builtins.catAttrs("config")([
        { config: { x: 1n, y: 2n } },
        { config: { a: 3n, b: 4n } }
    ])
)

// Test 6: Extract empty strings
await test(
    6,
    "extract empty string values",
    'builtins.catAttrs "str" [{str = "";} {str = "hello";} {str = "";}]',
    builtins.catAttrs("str")([
        { str: "" },
        { str: "hello" },
        { str: "" }
    ])
)

// Test 7: Extract empty lists
await test(
    7,
    "extract empty list values",
    'builtins.catAttrs "items" [{items = [];} {items = [1];} {items = [];}]',
    builtins.catAttrs("items")([
        { items: [] },
        { items: [1n] },
        { items: [] }
    ])
)

// Test 8: Extract from large list
await test(
    8,
    "extract from large list of attrsets",
    'builtins.catAttrs "n" [{n = 1;} {n = 2;} {n = 3;} {n = 4;} {n = 5;} {n = 6;} {n = 7;} {n = 8;} {n = 9;} {n = 10;}]',
    builtins.catAttrs("n")([
        { n: 1n }, { n: 2n }, { n: 3n }, { n: 4n }, { n: 5n },
        { n: 6n }, { n: 7n }, { n: 8n }, { n: 9n }, { n: 10n }
    ])
)

// Test 9: Extract functions
await test(
    9,
    "extract function values",
    'builtins.catAttrs "fn" [{fn = x: x;} {fn = x: x + 1;}]',
    builtins.catAttrs("fn")([
        { fn: (x) => x },
        { fn: (x) => x + 1n }
    ])
)

// Test 10: Extract mixed deeply nested structures
await test(
    10,
    "extract various complex nested values",
    'builtins.catAttrs "data" [{data = [1 2 3];} {data = {a = 1;}; } {other = "x";} {data = [[1] [2]];}]',
    builtins.catAttrs("data")([
        { data: [1n, 2n, 3n] },
        { data: { a: 1n } },
        { other: "x" },
        { data: [[1n], [2n]] }
    ])
)

printSummary()
