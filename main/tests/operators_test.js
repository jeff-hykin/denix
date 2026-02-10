import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { operators, builtins } from "../runtime.js"

Deno.test("operators.negative - negates bigint", () => {
    assertEquals(operators.negative(5n), -5n)
})

Deno.test("operators.negative - negates float", () => {
    assertEquals(operators.negative(5.5), -5.5)
})

Deno.test("operators.negate - inverts true", () => {
    assertEquals(operators.negate(true), false)
})

Deno.test("operators.negate - inverts false", () => {
    assertEquals(operators.negate(false), true)
})

Deno.test("operators.listConcat - concatenates lists", () => {
    const result = operators.listConcat([1, 2], [3, 4])
    assertEquals(result, [1, 2, 3, 4])
})

Deno.test("operators.divide - divides bigints", () => {
    assertEquals(operators.divide(10n, 2n), 5n)
})

Deno.test("operators.divide - divides floats", () => {
    assertEquals(operators.divide(10.0, 2.0), 5.0)
})

Deno.test("operators.multiply - multiplies bigints", () => {
    assertEquals(operators.multiply(5n, 3n), 15n)
})

Deno.test("operators.multiply - multiplies floats", () => {
    assertEquals(operators.multiply(2.5, 4.0), 10.0)
})

Deno.test("operators.merge - merges attrsets (right wins)", () => {
    const a = { x: 1, y: 2 }
    const b = { y: 20, z: 30 }
    const result = operators.merge(a, b)
    assertEquals(result.x, 1)
    assertEquals(result.y, 20)
    assertEquals(result.z, 30)
})

Deno.test("operators.and - true && true", () => {
    assertEquals(operators.and(true, true), true)
})

Deno.test("operators.and - true && false", () => {
    assertEquals(operators.and(true, false), false)
})

Deno.test("operators.and - false && true", () => {
    assertEquals(operators.and(false, true), false)
})

Deno.test("operators.and - false && false", () => {
    assertEquals(operators.and(false, false), false)
})

Deno.test("operators.or - true || true", () => {
    assertEquals(operators.or(true, true), true)
})

Deno.test("operators.or - true || false", () => {
    assertEquals(operators.or(true, false), true)
})

Deno.test("operators.or - false || true", () => {
    assertEquals(operators.or(false, true), true)
})

Deno.test("operators.or - false || false", () => {
    assertEquals(operators.or(false, false), false)
})

Deno.test("operators.implication - false -> false", () => {
    assertEquals(operators.implication(false, false), true)
})

Deno.test("operators.implication - false -> true", () => {
    assertEquals(operators.implication(false, true), true)
})

Deno.test("operators.implication - true -> false", () => {
    assertEquals(operators.implication(true, false), false)
})

Deno.test("operators.implication - true -> true", () => {
    assertEquals(operators.implication(true, true), true)
})

Deno.test("operators.greaterThan - 5 > 3", () => {
    assertEquals(operators.greaterThan(5, 3), true)
})

Deno.test("operators.greaterThan - 3 > 5", () => {
    assertEquals(operators.greaterThan(3, 5), false)
})

Deno.test("operators.greaterThan - 5 > 5", () => {
    assertEquals(operators.greaterThan(5, 5), false)
})

Deno.test("operators.lessThan - 3 < 5", () => {
    assertEquals(operators.lessThan(3, 5), true)
})

Deno.test("operators.lessThan - 5 < 3", () => {
    assertEquals(operators.lessThan(5, 3), false)
})

Deno.test("operators.lessThan - 5 < 5", () => {
    assertEquals(operators.lessThan(5, 5), false)
})

Deno.test("operators.greaterThanOrEqual - 5 >= 3", () => {
    assertEquals(operators.greaterThanOrEqual(5, 3), true)
})

Deno.test("operators.greaterThanOrEqual - 5 >= 5", () => {
    assertEquals(operators.greaterThanOrEqual(5, 5), true)
})

Deno.test("operators.greaterThanOrEqual - 3 >= 5", () => {
    assertEquals(operators.greaterThanOrEqual(3, 5), false)
})

Deno.test("operators.lessThanOrEqual - 3 <= 5", () => {
    assertEquals(operators.lessThanOrEqual(3, 5), true)
})

Deno.test("operators.lessThanOrEqual - 5 <= 5", () => {
    assertEquals(operators.lessThanOrEqual(5, 5), true)
})

Deno.test("operators.lessThanOrEqual - 5 <= 3", () => {
    assertEquals(operators.lessThanOrEqual(5, 3), false)
})

Deno.test("operators.hasAttr - finds existing attr", () => {
    const obj = { x: 1, y: 2 }
    assertEquals(operators.hasAttr(obj, "x"), true)
})

Deno.test("operators.hasAttr - missing attr returns false", () => {
    const obj = { x: 1, y: 2 }
    assertEquals(operators.hasAttr(obj, "z"), false)
})
