#!/usr/bin/env deno run --allow-all
/**
 * Tests for path interpolation in the Nix to JavaScript translator
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

console.log("\n✅ All path interpolation tests passed!")
