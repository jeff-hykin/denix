// Test suite for has-attr expressions (nested and interpolated)
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { operators } from "../runtime.js"

Deno.test("operators.hasAttr - finds existing attribute", () => {
    const simpleObj = { a: 1, b: 2 }
    assertEquals(operators.hasAttr(simpleObj, "a"), true)
})

Deno.test("operators.hasAttr - returns false for missing attribute", () => {
    const simpleObj = { a: 1, b: 2 }
    assertEquals(operators.hasAttr(simpleObj, "c"), false)
})

Deno.test("operators.hasAttrPath - finds deeply nested path", () => {
    const nestedObj = { a: { b: { c: 42 } } }
    assertEquals(operators.hasAttrPath(nestedObj, "a", "b", "c"), true)
})

Deno.test("operators.hasAttrPath - returns false for missing nested attribute", () => {
    const nestedObj = { a: { b: { c: 42 } } }
    assertEquals(operators.hasAttrPath(nestedObj, "a", "b", "d"), false)
})

Deno.test("operators.hasAttrPath - returns false when intermediate path is missing", () => {
    const nestedObj = { a: { b: { c: 42 } } }
    assertEquals(operators.hasAttrPath(nestedObj, "a", "x", "y"), false)
})

Deno.test("operators.hasAttrPath - returns false when intermediate value is not an object", () => {
    const partialObj = { a: 1 }
    assertEquals(operators.hasAttrPath(partialObj, "a", "b"), false)
})

Deno.test("operators.hasAttrPath - works with dynamic attribute names", () => {
    const nestedObj = { a: { b: { c: 42 } } }
    const dynamicKey = "b"
    assertEquals(operators.hasAttrPath(nestedObj, "a", dynamicKey, "c"), true)
})

Deno.test("operators.hasAttrPath - handles empty object", () => {
    assertEquals(operators.hasAttrPath({}, "a"), false)
})

Deno.test("operators.hasAttrPath - works with single-level path", () => {
    const singleLevel = { x: 5 }
    assertEquals(operators.hasAttrPath(singleLevel, "x"), true)
})

Deno.test("operators.hasAttrPath - finds attribute with null value", () => {
    const withNull = { a: null }
    assertEquals(operators.hasAttrPath(withNull, "a"), true)
})

Deno.test("operators.hasAttrPath - returns false when trying to descend into null", () => {
    const withNull = { a: null }
    assertEquals(operators.hasAttrPath(withNull, "a", "b"), false)
})

Deno.test("operators.hasAttrPath - returns false for array indices", () => {
    const withArray = { a: [1, 2, 3] }
    assertEquals(operators.hasAttrPath(withArray, "a", "0"), false)
})
