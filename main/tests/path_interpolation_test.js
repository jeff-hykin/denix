#!/usr/bin/env deno run --allow-all
/**
 * Tests for path interpolation in the Nix to JavaScript translator
 */

import { convertToJs } from "../translator.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

// Helper to evaluate the translated JavaScript code
const evalTranslated = (nixCode) => {
    let jsCode = convertToJs(nixCode)

    // Create a minimal Path class for testing
    class Path {
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

    const fn = new Function('runtime', 'Path', wrappedCode)
    return fn(runtime, Path)
}

console.log("Testing Path Interpolation\n")

// Test 1: Simple path without interpolation
Deno.test("Simple path without interpolation", () => {
    const nixCode = `./path/to/file`
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "./path/to/file")
})

// Test 2: Path with single interpolation
Deno.test("Path with single interpolation", () => {
    const nixCode = `
        let
            dir = "mydir";
        in
            ./\${dir}/file
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "./mydir/file")
})

// Test 3: Path with multiple interpolations
Deno.test("Path with multiple interpolations", () => {
    const nixCode = `
        let
            dir1 = "first";
            dir2 = "second";
        in
            ./\${dir1}/middle/\${dir2}/end
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "./first/middle/second/end")
})

// Test 4: Absolute path with interpolation
Deno.test("Absolute path with interpolation", () => {
    const nixCode = `
        let
            dir = "usr";
        in
            /\${dir}/local/bin
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "/usr/local/bin")
})

// Test 5: Path with interpolation right after slash
Deno.test("Path with interpolation right after slash", () => {
    const nixCode = `
        let
            file = "config";
        in
            /etc/\${file}.conf
    `
    const result = evalTranslated(nixCode)
    assertEquals(result.toString(), "/etc/config.conf")
})

