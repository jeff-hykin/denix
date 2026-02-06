#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.catAttrs - Basic tests\n")

// Test 1: Simple attribute extraction
await test(
    1,
    "extract attribute from list of attrsets",
    'builtins.catAttrs "name" [{name = "Alice";} {name = "Bob";} {name = "Charlie";}]',
    builtins.catAttrs("name")([
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" }
    ])
)

// Test 2: Empty list
await test(
    2,
    "extract from empty list",
    'builtins.catAttrs "name" []',
    builtins.catAttrs("name")([])
)

// Test 3: Missing attribute in some elements
await test(
    3,
    "skip elements missing the attribute",
    'builtins.catAttrs "age" [{name = "Alice"; age = 30;} {name = "Bob";} {name = "Charlie"; age = 25;}]',
    builtins.catAttrs("age")([
        { name: "Alice", age: 30n },
        { name: "Bob" },
        { name: "Charlie", age: 25n }
    ])
)

// Test 4: All elements missing attribute
await test(
    4,
    "all elements missing the attribute",
    'builtins.catAttrs "missing" [{a = 1;} {b = 2;} {c = 3;}]',
    builtins.catAttrs("missing")([{ a: 1n }, { b: 2n }, { c: 3n }])
)

// Test 5: Different value types
await test(
    5,
    "extract different value types",
    'builtins.catAttrs "value" [{value = 42;} {value = "text";} {value = true;}]',
    builtins.catAttrs("value")([
        { value: 42n },
        { value: "text" },
        { value: true }
    ])
)

// Test 6: Nested values
await test(
    6,
    "extract nested attrset values",
    'builtins.catAttrs "data" [{data = {x = 1;}; } {data = {y = 2;};}]',
    builtins.catAttrs("data")([
        { data: { x: 1n } },
        { data: { y: 2n } }
    ])
)

// Test 7: Lists as values
await test(
    7,
    "extract list values",
    'builtins.catAttrs "items" [{items = [1 2];} {items = [3 4];} {items = [5];}]',
    builtins.catAttrs("items")([
        { items: [1n, 2n] },
        { items: [3n, 4n] },
        { items: [5n] }
    ])
)

// Test 8: Single element list
await test(
    8,
    "extract from single element list",
    'builtins.catAttrs "x" [{x = 100; y = 200;}]',
    builtins.catAttrs("x")([{ x: 100n, y: 200n }])
)

// Test 9: Multiple attributes with same name
await test(
    9,
    "preserve order when extracting",
    'builtins.catAttrs "id" [{id = 3;} {id = 1;} {id = 4;} {id = 1;} {id = 5;}]',
    builtins.catAttrs("id")([
        { id: 3n },
        { id: 1n },
        { id: 4n },
        { id: 1n },
        { id: 5n }
    ])
)

// Test 10: Complex nested structures
await test(
    10,
    "extract from complex nested attrsets",
    'builtins.catAttrs "user" [{user = {name = "Alice"; role = "admin";}; } {user = {name = "Bob"; role = "user";};}]',
    builtins.catAttrs("user")([
        { user: { name: "Alice", role: "admin" } },
        { user: { name: "Bob", role: "user" } }
    ])
)

printSummary()
