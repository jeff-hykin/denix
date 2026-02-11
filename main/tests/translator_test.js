#!/usr/bin/env deno run --allow-all
/**
 * Integration tests for the Nix to JavaScript translator
 * Tests that translated code produces correct results
 */

import { convertToJs } from "../translator.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

// Helper to evaluate the translated JavaScript code
const evalTranslated = (nixCode) => {
    let jsCode = convertToJs(nixCode)

    // Create a simple runtime for testing
    const runtime = {
        scopeStack: [{}],
    }
    const operators = {
        ifThenElse: (condition, thenFn, elseFn) => {
            // Nix requires strict boolean values in if conditions
            if (typeof condition !== "boolean") {
                throw new Error(`error: expected a Boolean but found ${typeof condition}: ${condition}`)
            }
            return condition ? thenFn() : elseFn()
        },
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
        hasAttrPath: (obj, ...attrPath) => {
            let current = obj
            for (const attr of attrPath) {
                if (typeof current !== "object" || current === null || Array.isArray(current)) {
                    return false
                }
                if (!Object.prototype.hasOwnProperty.call(current, attr)) {
                    return false
                }
                current = current[attr]
            }
            return true
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


Deno.test("Function with default arguments", () => {
    const nix = `({ a, b ? 10 }: a + b) { a = 5; }`
    const result = evalTranslated(nix)
    assertEquals(result, 15n)
})

Deno.test("Function with default - override default", () => {
    const nix = `({ a, b ? 10 }: a + b) { a = 5; b = 3; }`
    const result = evalTranslated(nix)
    assertEquals(result, 8n)
})

Deno.test("Function with @ syntax", () => {
    const nix = `({ a, b }@args: a + b + args.a) { a = 5; b = 3; }`
    const result = evalTranslated(nix)
    assertEquals(result, 13n)
})

Deno.test("If with non-boolean (null) throws error", () => {
    const nix = `if null then 1 else 2`
    try {
        evalTranslated(nix)
        throw new Error("Should have thrown an error")
    } catch (e) {
        assertEquals(e.message.includes("expected a Boolean"), true)
    }
})

Deno.test("If with non-boolean (integer) throws error", () => {
    const nix = `if 0 then 1 else 2`
    try {
        evalTranslated(nix)
        throw new Error("Should have thrown an error")
    } catch (e) {
        assertEquals(e.message.includes("expected a Boolean"), true)
    }
})

Deno.test("If with non-boolean (string) throws error", () => {
    const nix = `if "" then 1 else 2`
    try {
        evalTranslated(nix)
        throw new Error("Should have thrown an error")
    } catch (e) {
        assertEquals(e.message.includes("expected a Boolean"), true)
    }
})

Deno.test("Nested attribute paths in non-rec attrset", () => {
    const nix = `{ a.b.c = 10; a.b.d = 20; }`
    const result = evalTranslated(nix)
    assertEquals(result.a.b.c, 10n)
    assertEquals(result.a.b.d, 20n)
})

Deno.test("Mixed depth nested attributes", () => {
    const nix = `{ a.b = 10; a.c = 20; d = 30; }`
    const result = evalTranslated(nix)
    assertEquals(result.a.b, 10n)
    assertEquals(result.a.c, 20n)
    assertEquals(result.d, 30n)
})

Deno.test("Scientific notation - positive exponent", () => {
    const nix = `1.5e10`
    const result = evalTranslated(nix)
    assertEquals(result, 15000000000)
})

Deno.test("Scientific notation - negative exponent", () => {
    const nix = `2.3e-5`
    const result = evalTranslated(nix)
    // Use approximate equality for floating point
    assertEquals(Math.abs(result - 0.000023) < 0.0000001, true)
})

// === Has-attr expression tests ===

Deno.test("Simple has-attr - exists", () => {
    const result = evalTranslated(`{ a = 1; b = 2; } ? a`)
    assertEquals(result, true)
})

Deno.test("Simple has-attr - missing", () => {
    const result = evalTranslated(`{ a = 1; b = 2; } ? c`)
    assertEquals(result, false)
})

Deno.test("Nested has-attr - exists", () => {
    const result = evalTranslated(`{ a = { b = { c = 42; }; }; } ? a.b.c`)
    assertEquals(result, true)
})

Deno.test("Nested has-attr - missing leaf", () => {
    const result = evalTranslated(`{ a = { b = { c = 42; }; }; } ? a.b.d`)
    assertEquals(result, false)
})

Deno.test("Nested has-attr - missing intermediate", () => {
    const result = evalTranslated(`{ a = { b = { c = 42; }; }; } ? a.x.c`)
    assertEquals(result, false)
})

Deno.test("Nested has-attr - non-object intermediate", () => {
    const result = evalTranslated(`{ a = 1; } ? a.b`)
    assertEquals(result, false)
})

Deno.test("Interpolated has-attr", () => {
    const result = evalTranslated(`let x = "b"; in { a = { b = 42; }; } ? a.\${x}`)
    assertEquals(result, true)
})

Deno.test("Mixed interpolated has-attr", () => {
    const result = evalTranslated(`let x = "b"; in { a = { b = { c = 42; }; }; } ? a.\${x}.c`)
    assertEquals(result, true)
})

