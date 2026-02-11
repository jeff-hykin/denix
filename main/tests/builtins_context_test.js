/**
 * Context Operation Builtin Tests
 *
 * Tests 4 context-related builtins:
 * - hasContext: Check if string has context metadata
 * - unsafeDiscardStringContext: Remove string context
 * - addErrorContext: Add error context to thrown exceptions
 * - appendContext: Append string context metadata
 *
 * Note: Denix implementation doesn't track string context internally,
 * so these functions have simplified behavior compared to real Nix.
 * However, they maintain the correct API and error handling.
 *
 * Total: 32 tests
 */

import { assertEquals, assertThrows } from "https://deno.land/std@0.220.1/assert/mod.ts"
import { builtins } from "../runtime.js"

//
// hasContext tests (7 tests)
//
Deno.test("hasContext - plain string without context", () => {
    const result = builtins.hasContext("plain string")
    assertEquals(result, false)
})

Deno.test("hasContext - empty string", () => {
    const result = builtins.hasContext("")
    assertEquals(result, false)
})

Deno.test("hasContext - string with spaces", () => {
    const result = builtins.hasContext("  hello world  ")
    assertEquals(result, false)
})

Deno.test("hasContext - string with special characters", () => {
    const result = builtins.hasContext("test\nwith\ttabs")
    assertEquals(result, false)
})

//
// unsafeDiscardStringContext tests (4 tests)
//
Deno.test("unsafeDiscardStringContext - plain string", () => {
    const result = builtins.unsafeDiscardStringContext("plain string")
    assertEquals(result, "plain string")
})

Deno.test("unsafeDiscardStringContext - empty string", () => {
    const result = builtins.unsafeDiscardStringContext("")
    assertEquals(result, "")
})

Deno.test("unsafeDiscardStringContext - string with special characters", () => {
    const result = builtins.unsafeDiscardStringContext("test\nwith\ttabs")
    assertEquals(result, "test\nwith\ttabs")
})

Deno.test("unsafeDiscardStringContext - result has no context", () => {
    const original = "test string"
    const result = builtins.unsafeDiscardStringContext(original)
    const hasCtx = builtins.hasContext(result)
    assertEquals(hasCtx, false)
})

//
// addErrorContext tests (6 tests)
//
Deno.test("addErrorContext - returns value when no error", () => {
    const contextMsg = "custom error context"
    const value = 42
    const result = builtins.addErrorContext(contextMsg)(value)
    assertEquals(result, 42)
})

Deno.test("addErrorContext - returns string value", () => {
    const contextMsg = "processing string"
    const value = "hello"
    const result = builtins.addErrorContext(contextMsg)(value)
    assertEquals(result, "hello")
})

Deno.test("addErrorContext - returns object value", () => {
    const contextMsg = "processing object"
    const value = { a: 1, b: 2 }
    const result = builtins.addErrorContext(contextMsg)(value)
    assertEquals(result, { a: 1, b: 2 })
})

Deno.test("addErrorContext - returns function value", () => {
    const contextMsg = "processing function"
    const value = (x) => x + 1
    const result = builtins.addErrorContext(contextMsg)(value)
    assertEquals(typeof result, "function")
    assertEquals(result(5), 6)
})

Deno.test("addErrorContext - is curried", () => {
    const withContext = builtins.addErrorContext("my context")
    assertEquals(typeof withContext, "function")
    const result = withContext("value")
    assertEquals(result, "value")
})

Deno.test("addErrorContext - empty context string", () => {
    const result = builtins.addErrorContext("")("value")
    assertEquals(result, "value")
})

//
// appendContext tests (6 tests)
//
Deno.test("appendContext - append empty context to string", () => {
    const result = builtins.appendContext("test string")({})
    assertEquals(result, "test string")
})

Deno.test("appendContext - append context to plain string", () => {
    const ctx = { "/nix/store/abc-test.drv": { outputs: ["out"] } }
    const result = builtins.appendContext("my string")(ctx)
    assertEquals(result, "my string")
})

Deno.test("appendContext - append to empty string", () => {
    const ctx = { "/nix/store/abc-test.drv": { outputs: ["out"] } }
    const result = builtins.appendContext("")(ctx)
    assertEquals(result, "")
})

Deno.test("appendContext - is curried", () => {
    const appendToTest = builtins.appendContext("test")
    assertEquals(typeof appendToTest, "function")
    const result = appendToTest({})
    assertEquals(result, "test")
})

Deno.test("appendContext - multiple outputs in context", () => {
    const ctx = {
        "/nix/store/abc-test.drv": {
            outputs: ["out", "dev", "lib"]
        }
    }
    const result = builtins.appendContext("string")(ctx)
    assertEquals(result, "string")
})

Deno.test("appendContext - multiple derivations in context", () => {
    const ctx = {
        "/nix/store/abc-test1.drv": { outputs: ["out"] },
        "/nix/store/def-test2.drv": { outputs: ["out"] }
    }
    const result = builtins.appendContext("string")(ctx)
    assertEquals(result, "string")
})

//
// Integration tests - combining operations (3 tests)
//
Deno.test("integration - unsafeDiscardStringContext removes context from appendContext result", () => {
    // In real Nix, appendContext adds context, unsafeDiscardStringContext removes it
    const ctx = { "/nix/store/abc-test.drv": { outputs: ["out"] } }
    const withContext = builtins.appendContext("test")(ctx)
    const withoutContext = builtins.unsafeDiscardStringContext(withContext)

    // In our implementation, context isn't tracked, so both should be "test"
    assertEquals(withoutContext, "test")
    assertEquals(builtins.hasContext(withoutContext), false)
})

Deno.test("integration - hasContext after appendContext", () => {
    // In real Nix, this would return true
    // In our implementation, we don't track context so it returns false
    const ctx = { "/nix/store/abc-test.drv": { outputs: ["out"] } }
    const withContext = builtins.appendContext("test")(ctx)
    const hasCtx = builtins.hasContext(withContext)

    // Our implementation doesn't track context
    assertEquals(hasCtx, false)
})

Deno.test("integration - addErrorContext with string operations", () => {
    const str = builtins.unsafeDiscardStringContext("test")
    const result = builtins.addErrorContext("processing")(str)
    assertEquals(result, "test")
})

//
// Error handling tests (6 tests)
//
Deno.test("hasContext - throws on non-string", () => {
    assertThrows(
        () => builtins.hasContext(42),
        Error,
        "while a string was expected"
    )
})

Deno.test("hasContext - throws on null", () => {
    assertThrows(
        () => builtins.hasContext(null),
        Error,
        "while a string was expected"
    )
})

Deno.test("hasContext - throws on array", () => {
    assertThrows(
        () => builtins.hasContext([1, 2, 3]),
        Error,
        "while a string was expected"
    )
})

Deno.test("hasContext - throws on object", () => {
    assertThrows(
        () => builtins.hasContext({ a: 1 }),
        Error,
        "while a string was expected"
    )
})

Deno.test("unsafeDiscardStringContext - throws on non-string", () => {
    assertThrows(
        () => builtins.unsafeDiscardStringContext(42),
        Error,
        "while a string was expected"
    )
})

Deno.test("unsafeDiscardStringContext - throws on null", () => {
    assertThrows(
        () => builtins.unsafeDiscardStringContext(null),
        Error,
        "while a string was expected"
    )
})

Deno.test("appendContext - throws on non-string first argument", () => {
    assertThrows(
        () => builtins.appendContext(42)({}),
        Error,
        "while a string was expected"
    )
})

Deno.test("appendContext - throws on non-attrset second argument", () => {
    assertThrows(
        () => builtins.appendContext("test")("not an object"),
        Error,
        "while a set was expected"
    )
})

Deno.test("appendContext - throws on null second argument", () => {
    assertThrows(
        () => builtins.appendContext("test")(null),
        Error,
        "while a set was expected"
    )
})
