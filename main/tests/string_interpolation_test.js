#!/usr/bin/env deno run --allow-all
/**
 * Tests for string interpolation in the Nix to JavaScript translator
 */

import { convertToJsSync } from "../../translator.js"
import {
    createRuntime as createFullRuntime,
    operators,
    builtins,
    InterpolatedString,
    Path,
} from "../runtime.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

// Evaluate translated Nix against the REAL runtime: extract the trailing
// `export default <expr>` and bind exactly the identifiers the module preamble
// would have. (See translator_test.js for the rationale.)
const evalTranslated = (nixCode) => {
    const jsCode = convertToJsSync(nixCode)
    const { createFunc, createScope, defGetter, apply, set, force, mkThunk, nixArg, runtime } = createFullRuntime()

    const marker = "export default "
    const idx = jsCode.lastIndexOf(marker)
    const expr = (idx >= 0 ? jsCode.slice(idx + marker.length) : jsCode).trim()

    const nixScope = runtime.scopeStack[runtime.scopeStack.length - 1]

    const fn = new Function(
        "runtime", "operators", "builtins", "createFunc", "createScope",
        "defGetter", "apply", "set", "force", "mkThunk", "nixScope", "scope", "nixArg", "Path", "InterpolatedString",
        `return (${expr})`,
    )
    return fn(
        runtime, operators, builtins, createFunc, createScope,
        defGetter, apply, set, force, mkThunk, nixScope, nixScope, nixArg, Path, InterpolatedString,
    )
}

console.log("Testing String Interpolation\n")

// Test 1: Simple interpolation with double quotes
Deno.test("Simple string interpolation with double quotes", () => {
    const nixCode = `
        let
            name = "world";
        in
            "hello \${name}"
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "hello world")
})

// Test 2: Multiple interpolations
Deno.test("Multiple interpolations in one string", () => {
    const nixCode = `
        let
            x = "foo";
            y = "bar";
        in
            "prefix \${x} middle \${y} suffix"
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "prefix foo middle bar suffix")
})

// Test 3: Interpolation with expressions.
// Nix does NOT coerce a bare integer in interpolation ("${x}" throws); it must
// be converted explicitly with toString.
Deno.test("Interpolation with integer expression", () => {
    const nixCode = `
        let
            x = 10;
            y = 20;
        in
            "sum is \${toString x}"
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "sum is 10")
})

// Test 4: Indented string interpolation
Deno.test("Indented string interpolation", () => {
    const nixCode = `
        let
            name = "world";
        in
            ''hello \${name}''
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "hello world")
})

// Test 5: Indented string with multiple interpolations
Deno.test("Indented string with multiple interpolations", () => {
    const nixCode = `
        let
            a = "first";
            b = "second";
        in
            ''start \${a} mid \${b} end''
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "start first mid second end")
})

// Test 6: Nested attribute access in interpolation
Deno.test("Interpolation with attribute access", () => {
    const nixCode = `
        let
            obj = { name = "test"; };
        in
            "value: \${obj.name}"
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "value: test")
})

// Test 7: Empty string segments
Deno.test("Interpolation at start and end", () => {
    const nixCode = `
        let
            start = "START";
            end = "END";
        in
            "\${start} middle \${end}"
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "START middle END")
})

// Test 8: Single interpolation
Deno.test("String with only interpolation", () => {
    const nixCode = `
        let
            value = "content";
        in
            "\${value}"
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "content")
})

console.log("\n✅ All string interpolation tests passed!")
