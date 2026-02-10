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

// lessThan tests
// Documentation: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-lessThan
// nix repl> builtins.lessThan 3 5
// true
// nix repl> builtins.lessThan 5 3
// false
// nix repl> builtins.lessThan 3 3
// false
// nix repl> builtins.lessThan "a" "b"
// true

Deno.test("lessThan - integer comparison (3 < 5)", () => {
    assertEquals(builtins.lessThan(3n)(5n), true)
})

Deno.test("lessThan - integer comparison (5 < 3)", () => {
    assertEquals(builtins.lessThan(5n)(3n), false)
})

Deno.test("lessThan - equal integers", () => {
    assertEquals(builtins.lessThan(3n)(3n), false)
})

Deno.test("lessThan - negative integers", () => {
    assertEquals(builtins.lessThan(-5n)(-3n), true)
})

Deno.test("lessThan - string comparison (lexicographic)", () => {
    assertEquals(builtins.lessThan("a")("b"), true)
})

Deno.test("lessThan - string comparison (reverse)", () => {
    assertEquals(builtins.lessThan("b")("a"), false)
})

Deno.test("lessThan - float comparison", () => {
    assertEquals(builtins.lessThan(3.5)(4.5), true)
})

Deno.test("lessThan - mixed int and float", () => {
    assertEquals(builtins.lessThan(3n)(3.5), true)
})

// mul tests
// Documentation: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-mul
// nix repl> builtins.mul 3 5
// 15
// nix repl> builtins.mul 3.5 2
// 7.0
// nix repl> builtins.mul (-3) 5
// -15

Deno.test("mul - integer multiplication (3 * 5)", () => {
    assertEquals(builtins.mul(3n)(5n), 15n)
})

Deno.test("mul - with zero", () => {
    assertEquals(builtins.mul(0n)(5n), 0n)
})

Deno.test("mul - with one", () => {
    assertEquals(builtins.mul(1n)(7n), 7n)
})

Deno.test("mul - negative integers", () => {
    assertEquals(builtins.mul(-3n)(5n), -15n)
})

Deno.test("mul - both negative", () => {
    assertEquals(builtins.mul(-3n)(-5n), 15n)
})

Deno.test("mul - float multiplication", () => {
    assertEquals(builtins.mul(3.5)(2.0), 7.0)
})

Deno.test("mul - mixed int and float", () => {
    assertEquals(builtins.mul(3n)(2.5), 7.5)
})

Deno.test("mul - large integers", () => {
    assertEquals(builtins.mul(1000n)(2000n), 2000000n)
})
