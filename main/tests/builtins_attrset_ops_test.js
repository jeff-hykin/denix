import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

// Attrset operations: attrNames, attrValues, catAttrs

Deno.test("attrNames - returns sorted attribute names", () => {
    const result = builtins.attrNames({ z: 1n, a: 2n, m: 3n })
    assertEquals(result, ["a", "m", "z"])
})

Deno.test("attrNames - empty attrset", () => {
    const result = builtins.attrNames({})
    assertEquals(result, [])
})

Deno.test("attrNames - single attribute", () => {
    const result = builtins.attrNames({ foo: "bar" })
    assertEquals(result, ["foo"])
})

Deno.test("attrNames - many attributes stay sorted", () => {
    const result = builtins.attrNames({ z: 1n, y: 2n, x: 3n, a: 4n, b: 5n, c: 6n })
    assertEquals(result, ["a", "b", "c", "x", "y", "z"])
})

Deno.test("attrNames - numeric string keys sorted alphabetically", () => {
    const result = builtins.attrNames({ "10": 1n, "2": 2n, "1": 3n })
    assertEquals(result, ["1", "10", "2"])
})

Deno.test("attrValues - returns values in sorted key order", () => {
    const result = builtins.attrValues({ z: 1n, a: 2n, m: 3n })
    assertEquals(result, [2n, 3n, 1n]) // Values for keys "a", "m", "z"
})

Deno.test("attrValues - empty attrset", () => {
    const result = builtins.attrValues({})
    assertEquals(result, [])
})

Deno.test("attrValues - single attribute", () => {
    const result = builtins.attrValues({ foo: "bar" })
    assertEquals(result, ["bar"])
})

Deno.test("attrValues - mixed types", () => {
    const result = builtins.attrValues({ a: 1n, b: "string", c: true, d: null })
    assertEquals(result, [1n, "string", true, null])
})

Deno.test("catAttrs - extract attribute from list of sets", () => {
    const result = builtins.catAttrs("x")([
        { x: 1n, y: 2n },
        { x: 3n },
        { y: 4n }
    ])
    assertEquals(result, [1n, 3n])
})

Deno.test("catAttrs - missing attribute returns empty list", () => {
    const result = builtins.catAttrs("missing")([
        { x: 1n },
        { y: 2n }
    ])
    assertEquals(result, [])
})

Deno.test("catAttrs - empty list returns empty list", () => {
    const result = builtins.catAttrs("x")([])
    assertEquals(result, [])
})

Deno.test("catAttrs - all items have attribute", () => {
    const result = builtins.catAttrs("name")([
        { name: "alice", age: 30n },
        { name: "bob", age: 25n },
        { name: "charlie", age: 35n }
    ])
    assertEquals(result, ["alice", "bob", "charlie"])
})

Deno.test("catAttrs - mixed presence of attribute", () => {
    const result = builtins.catAttrs("value")([
        { value: 1n },
        { other: 2n },
        { value: 3n },
        { value: 4n },
        { other: 5n }
    ])
    assertEquals(result, [1n, 3n, 4n])
})

Deno.test("catAttrs - null values included", () => {
    const result = builtins.catAttrs("x")([
        { x: 1n },
        { x: null },
        { x: 2n }
    ])
    assertEquals(result, [1n, null, 2n])
})
