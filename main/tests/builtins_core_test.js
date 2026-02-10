#!/usr/bin/env deno run --allow-all
/**
 * Core builtin tests - Consolidated from old test files
 * Tests fundamental builtins: type checking, list ops, attrset ops, control flow, versioning
 */

import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { NixError } from "../errors.js"

// ============================================================================
// List Operations
// ============================================================================

Deno.test("builtins.groupBy - basic grouping", () => {
    const input = ["foo", "bar", "baz", "fan"]
    const result = builtins.groupBy((s) => s[0])(input)
    assertEquals(result.f, ["foo", "fan"])
    assertEquals(result.b, ["bar", "baz"])
})

Deno.test("builtins.groupBy - with substring", () => {
    const input = ["foo", "bar", "baz"]
    const result = builtins.groupBy((s) => builtins.substring(0)(1)(s))(input)
    assertEquals(result.b, ["bar", "baz"])
    assertEquals(result.f, ["foo"])
})

// ============================================================================
// Attrset Operations
// ============================================================================

Deno.test("builtins.mapAttrs - transform values", () => {
    const input = { a: 1, b: 2, c: 3 }
    const result = builtins.mapAttrs((name) => (value) => value * 10)(input)
    assertEquals(result, { a: 10, b: 20, c: 30 })
})

Deno.test("builtins.removeAttrs - remove specified attrs", () => {
    const input = { x: 1, y: 2, z: 3 }
    const result = builtins.removeAttrs(input)(["a", "x", "z"])
    assertEquals(result, { y: 2 })
})

Deno.test("builtins.listToAttrs - convert list to attrs", () => {
    const input = [
        { name: "a", value: 1 },
        { name: "b", value: 2 },
        { name: "a", value: 999 }  // duplicate, should be ignored
    ]
    const result = builtins.listToAttrs(input)
    assertEquals(result, { a: 1, b: 2 })
})

Deno.test("builtins.intersectAttrs - keep only matching keys", () => {
    const e1 = { x: 1, y: 2 }
    const e2 = { x: 10, z: 30 }
    const result = builtins.intersectAttrs(e1)(e2)
    assertEquals(result, { x: 10 })
})

Deno.test("builtins.concatMap - map and flatten", () => {
    const input = [1, 2, 3]
    const result = builtins.concatMap((x) => [x, x * 10])(input)
    assertEquals(result, [1, 10, 2, 20, 3, 30])
})

// ============================================================================
// Control Flow & Evaluation
// ============================================================================

Deno.test("builtins.trace - returns second argument", () => {
    const result = builtins.trace("debug message")(42)
    assertEquals(result, 42)
})

Deno.test("builtins.throw - throws NixError", () => {
    assertThrows(
        () => builtins.throw("test error"),
        NixError,
        "test error"
    )
})

Deno.test("builtins.seq - evaluates and returns second arg", () => {
    const result = builtins.seq(123)(456)
    assertEquals(result, 456)
})

Deno.test("builtins.deepSeq - evaluates nested and returns second arg", () => {
    const nested = { a: { b: { c: 1 } } }
    const result = builtins.deepSeq(nested)(42)
    assertEquals(result, 42)
})

Deno.test("builtins.tryEval - success case", () => {
    const result = builtins.tryEval(42)
    assertEquals(result.success, true)
    assertEquals(result.value, 42)
})

// ============================================================================
// Version & Package Name Parsing
// ============================================================================

Deno.test("builtins.parseDrvName - basic case", () => {
    const result = builtins.parseDrvName("nix-0.12pre12876")
    assertEquals(result, { name: "nix", version: "0.12pre12876" })
})

Deno.test("builtins.parseDrvName - simple version", () => {
    const result = builtins.parseDrvName("hello-world")
    assertEquals(result, { name: "hello", version: "world" })
})

Deno.test("builtins.parseDrvName - no version", () => {
    const result = builtins.parseDrvName("noversion")
    assertEquals(result, { name: "noversion", version: "" })
})

Deno.test("builtins.compareVersions - less than", () => {
    assertEquals(builtins.compareVersions("1.0")("2.0"), -1)
    assertEquals(builtins.compareVersions("1.2.3")("1.2.4"), -1)
})

Deno.test("builtins.compareVersions - greater than", () => {
    assertEquals(builtins.compareVersions("2.0")("1.0"), 1)
    assertEquals(builtins.compareVersions("1.10")("1.9"), 1)
})

Deno.test("builtins.compareVersions - equal", () => {
    assertEquals(builtins.compareVersions("1.0")("1.0"), 0)
})
