#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

// Import the runtime
const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.toXML - Intermediate tests\n")

// Test 1: Float number
await test(
    1,
    "convert float to XML",
    'builtins.toXML 3.14',
    builtins.toXML(3.14)
)

// Test 2: Negative integer
await test(
    2,
    "convert negative integer to XML",
    'builtins.toXML (-42)',
    builtins.toXML(-42n)
)

// Test 3: String with special characters
await test(
    3,
    "convert string with special XML characters",
    'builtins.toXML "hello <world> & \\"quotes\\""',
    builtins.toXML('hello <world> & "quotes"')
)

// Test 4: List of different types
await test(
    4,
    "convert mixed-type list to XML",
    'builtins.toXML [1 "text" true null]',
    builtins.toXML([1n, "text", true, null])
)

// Test 5: Nested lists
await test(
    5,
    "convert nested lists to XML",
    'builtins.toXML [[1 2] [3 4] [5]]',
    builtins.toXML([[1n, 2n], [3n, 4n], [5n]])
)

// Test 6: Attrset with multiple types
await test(
    6,
    "convert attrset with various value types",
    'builtins.toXML {num = 42; str = "hello"; bool = true; nul = null;}',
    builtins.toXML({ num: 42n, str: "hello", bool: true, nul: null })
)

// Test 7: Nested attrsets
await test(
    7,
    "convert nested attrsets to XML",
    'builtins.toXML {outer = {inner = {deep = 123;};};}',
    builtins.toXML({ outer: { inner: { deep: 123n } } })
)

// Test 8: Attrset with list value
await test(
    8,
    "convert attrset containing lists",
    'builtins.toXML {numbers = [1 2 3]; strings = ["a" "b"];}',
    builtins.toXML({ numbers: [1n, 2n, 3n], strings: ["a", "b"] })
)

// Test 9: List of attrsets
await test(
    9,
    "convert list of attrsets to XML",
    'builtins.toXML [{id = 1; name = "Alice";} {id = 2; name = "Bob";}]',
    builtins.toXML([
        { id: 1n, name: "Alice" },
        { id: 2n, name: "Bob" }
    ])
)

// Test 10: Complex deeply nested structure
await test(
    10,
    "convert complex nested structure",
    'builtins.toXML {users = [{name = "Alice"; tags = ["admin" "user"];} {name = "Bob"; tags = ["user"];}]; count = 2;}',
    builtins.toXML({
        users: [
            { name: "Alice", tags: ["admin", "user"] },
            { name: "Bob", tags: ["user"] }
        ],
        count: 2n
    })
)

printSummary()
