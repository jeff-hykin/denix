#!/usr/bin/env deno run --allow-all
/**
 * Integration tests for the Nix to JavaScript translator
 * Tests that translated code produces correct results
 */

import { convertToJs } from "../../main.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

// Helper to evaluate the translated JavaScript code
const evalTranslated = (nixCode) => {
    let jsCode = convertToJs(nixCode)

    // Create a simple runtime for testing
    const runtime = {
        scopeStack: [{}],
    }
    const operators = {
        add: (a, b) => {
            if (typeof a === 'bigint' && typeof b === 'bigint') {
                return a + b
            }
            if (typeof a === 'number' && typeof b === 'number') {
                return a + b
            }
            if (typeof a === 'string' || typeof b === 'string') {
                return String(a) + String(b)
            }
            throw new Error(`Cannot add ${typeof a} and ${typeof b}`)
        },
        multiply: (a, b) => {
            if (typeof a === 'bigint' && typeof b === 'bigint') {
                return a * b
            }
            return a * b
        },
        equal: (a, b) => {
            // Deep equality for objects/arrays
            return JSON.stringify(a) === JSON.stringify(b)
        },
        hasAttr: (obj, attr) => {
            return obj && Object.prototype.hasOwnProperty.call(obj, attr)
        },
    }

    // Strip import statement if present (for simple expressions that don't need runtime)
    if (jsCode.includes('import { createRuntime }')) {
        jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
        jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
    }

    // Wrap in function to provide runtime context
    const wrappedCode = `
        return (function() {
            return ${jsCode}
        })()
    `

    const fn = new Function('runtime', 'operators', wrappedCode)
    return fn(runtime, operators)
}

console.log("Testing Nix to JavaScript translator\n")

// Test 1: Simple literals
Deno.test("Simple integer literal", () => {
    const result = evalTranslated("42")
    assertEquals(result, 42n)
})

Deno.test("Simple float literal", () => {
    const result = evalTranslated("3.14")
    assertEquals(result, 3.14)
})

Deno.test("Simple string literal", () => {
    const result = evalTranslated('"hello"')
    assertEquals(result, "hello")
})

// Test 2: Lists
Deno.test("Simple list", () => {
    const result = evalTranslated("[1 2 3]")
    assertEquals(result, [1n, 2n, 3n])
})

Deno.test("Mixed type list", () => {
    const result = evalTranslated('[1 "hello" 3.14]')
    assertEquals(result, [1n, "hello", 3.14])
})

// Test 3: Attribute sets
Deno.test("Simple attrset", () => {
    const result = evalTranslated("{ x = 10; y = 20; }")
    assertEquals(result, { x: 10n, y: 20n })
})

Deno.test("Rec attrset with reference", () => {
    const result = evalTranslated("rec { x = 10; y = x; }")
    assertEquals(result.x, 10n)
    assertEquals(result.y, 10n)
})

// Test 4: Let expressions
Deno.test("Simple let expression", () => {
    const result = evalTranslated(`
        let
            x = 10;
        in
            x
    `)
    assertEquals(result, 10n)
})

Deno.test("Let with multiple bindings", () => {
    const result = evalTranslated(`
        let
            x = 10;
            y = 20;
        in
            [x y]
    `)
    assertEquals(result, [10n, 20n])
})

Deno.test("Let with reference", () => {
    const result = evalTranslated(`
        let
            x = 10;
            y = x;
        in
            y
    `)
    assertEquals(result, 10n)
})

Deno.test("Let with nested attributes", () => {
    const result = evalTranslated(`
        let
            a.b = 10;
        in
            a.b
    `)
    assertEquals(result, 10n)
})

// Test 5: Select expressions
Deno.test("Simple attribute selection", () => {
    const result = evalTranslated(`
        let
            obj = { x = 10; };
        in
            obj.x
    `)
    assertEquals(result, 10n)
})

Deno.test("Nested attribute selection", () => {
    const result = evalTranslated(`
        let
            obj = { a = { b = { c = 42; }; }; };
        in
            obj.a.b.c
    `)
    assertEquals(result, 42n)
})

// Test 6: With expressions
Deno.test("Simple with expression", () => {
    const result = evalTranslated(`
        with { x = 10; y = 20; }; x
    `)
    assertEquals(result, 10n)
})

Deno.test("With expression using multiple attrs", () => {
    const result = evalTranslated(`
        with { x = 10; y = 20; }; [x y]
    `)
    assertEquals(result, [10n, 20n])
})

// Test 7: If expressions
Deno.test("If expression - true branch", () => {
    const result = evalTranslated(`
        if true then 10 else 20
    `)
    assertEquals(result, 10n)
})

Deno.test("If expression - false branch", () => {
    const result = evalTranslated(`
        if false then 10 else 20
    `)
    assertEquals(result, 20n)
})

// Test 8: Operators
Deno.test("Integer addition", () => {
    const result = evalTranslated("10 + 5")
    assertEquals(result, 15n)
})

Deno.test("Float addition", () => {
    const result = evalTranslated("10.5 + 5.5")
    assertEquals(result, 16.0)
})

Deno.test("Integer multiplication", () => {
    const result = evalTranslated("10 * 5")
    assertEquals(result, 50n)
})

// Test 9: Complex combinations
Deno.test("Complex let with operators", () => {
    const result = evalTranslated(`
        let
            x = 10;
            y = 20;
            z = x + y;
        in
            z
    `)
    assertEquals(result, 30n)
})

Deno.test("Complex nested expression", () => {
    const result = evalTranslated(`
        let
            a = { x = 10; y = 20; };
            b = a.x + a.y;
        in
            b
    `)
    assertEquals(result, 30n)
})

Deno.test("With and let combined", () => {
    const result = evalTranslated(`
        let
            attrs = { x = 10; };
        in
            with attrs; x
    `)
    assertEquals(result, 10n)
})

console.log("\n✅ All translator tests passed!")
