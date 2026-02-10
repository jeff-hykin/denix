import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

// Math operations: ceil, floor
// Bitwise operations: bitAnd, bitOr, bitXor

Deno.test("ceil - positive float rounds up", () => {
    assertEquals(builtins.ceil(3.7), 4n)
})

Deno.test("ceil - negative float rounds toward zero", () => {
    assertEquals(builtins.ceil(-3.7), -3n)
})

Deno.test("ceil - integer returns same value", () => {
    assertEquals(builtins.ceil(5n), 5n)
})

Deno.test("ceil - zero", () => {
    assertEquals(builtins.ceil(0.0), 0n)
})

Deno.test("ceil - small positive", () => {
    assertEquals(builtins.ceil(0.1), 1n)
})

Deno.test("ceil - small negative", () => {
    assertEquals(builtins.ceil(-0.1), 0n)
})

Deno.test("floor - positive float rounds down", () => {
    assertEquals(builtins.floor(3.7), 3n)
})

Deno.test("floor - negative float rounds away from zero", () => {
    assertEquals(builtins.floor(-3.7), -4n)
})

Deno.test("floor - integer returns same value", () => {
    assertEquals(builtins.floor(5n), 5n)
})

Deno.test("floor - zero", () => {
    assertEquals(builtins.floor(0.0), 0n)
})

Deno.test("floor - small positive", () => {
    assertEquals(builtins.floor(0.9), 0n)
})

Deno.test("floor - small negative", () => {
    assertEquals(builtins.floor(-0.1), -1n)
})

Deno.test("bitAnd - basic operation (6 & 3 = 2)", () => {
    assertEquals(builtins.bitAnd(6n)(3n), 2n)
})

Deno.test("bitAnd - with zero returns zero", () => {
    assertEquals(builtins.bitAnd(0n)(5n), 0n)
})

Deno.test("bitAnd - same values", () => {
    assertEquals(builtins.bitAnd(7n)(7n), 7n)
})

Deno.test("bitAnd - all bits set", () => {
    assertEquals(builtins.bitAnd(15n)(7n), 7n)
})

Deno.test("bitOr - basic operation (6 | 3 = 7)", () => {
    assertEquals(builtins.bitOr(6n)(3n), 7n)
})

Deno.test("bitOr - with zero returns input", () => {
    assertEquals(builtins.bitOr(0n)(5n), 5n)
})

Deno.test("bitOr - same values", () => {
    assertEquals(builtins.bitOr(7n)(7n), 7n)
})

Deno.test("bitOr - disjoint bits", () => {
    assertEquals(builtins.bitOr(8n)(4n), 12n)
})

Deno.test("bitXor - basic operation (6 ^ 3 = 5)", () => {
    assertEquals(builtins.bitXor(6n)(3n), 5n)
})

Deno.test("bitXor - with zero returns input", () => {
    assertEquals(builtins.bitXor(0n)(5n), 5n)
})

Deno.test("bitXor - same values returns zero", () => {
    assertEquals(builtins.bitXor(5n)(5n), 0n)
})

Deno.test("bitXor - canceling bits", () => {
    assertEquals(builtins.bitXor(15n)(7n), 8n)
})
