#!/usr/bin/env deno run --allow-all
/**
 * Tests for string interpolation in the Nix to JavaScript translator
 */

import { convertToJs } from "../../translator.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

// Helper to evaluate the translated JavaScript code
const evalTranslated = (nixCode) => {
    let jsCode = convertToJs(nixCode)

    // Create a minimal runtime for testing
    class InterpolatedString {
        constructor(strings, getters) {
            this.strings = strings
            this.getters = getters
        }
        toString() {
            const chunks = []
            for (let i = 0; i < this.strings.length; i++) {
                if (this.strings[i]) {
                    chunks.push(this.strings[i])
                }
                if (i < this.getters.length && this.getters[i]) {
                    const value = this.getters[i]()
                    chunks.push(String(value))
                }
            }
            return chunks.join("")
        }
    }

    const runtime = {
        scopeStack: [{}],
    }

    // Remove imports if present
    jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
    jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')

    // The generated code is already an IIFE, so just return it
    const wrappedCode = `return ${jsCode}`

    const fn = new Function('runtime', 'InterpolatedString', wrappedCode)
    return fn(runtime, InterpolatedString)
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

// Test 3: Interpolation with expressions
Deno.test("Interpolation with integer expression", () => {
    const nixCode = `
        let
            x = 10;
            y = 20;
        in
            "sum is \${x}"
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

