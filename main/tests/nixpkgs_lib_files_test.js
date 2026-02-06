#!/usr/bin/env deno test --allow-all
/**
 * Test suite for complete nixpkgs.lib files with imports
 *
 * This test suite validates that the translator + import system can handle
 * real nixpkgs.lib files, including their dependencies.
 *
 * Tests progress from simple (no imports) to complex (multi-file with imports).
 */

import { convertToJs } from "../../main.js"
import { createRuntime } from "../runtime.js"
import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { resolve, dirname, join } from "https://deno.land/std@0.224.0/path/mod.ts"

const nixpkgsLibPath = resolve(Deno.cwd(), "nixpkgs.lib/lib")

/**
 * Helper: Load and evaluate a nixpkgs.lib file
 */
function loadLibFile(filename, args = {}) {
    const filePath = join(nixpkgsLibPath, filename)
    const nixCode = Deno.readTextFileSync(filePath)

    // Translate to JS
    const jsCode = convertToJs(nixCode, { relativePath: filePath })

    // Create runtime with import support
    const runtime = createRuntime()

    // Evaluate the translated code
    // Most lib files are functions that take arguments (like { lib })
    const moduleValue = eval(jsCode)

    // If it's a function, call it with args
    if (typeof moduleValue === "function") {
        return moduleValue(args)
    }

    return moduleValue
}

/**
 * Helper: Create a minimal lib context for testing
 */
function createMinimalLibContext() {
    // Start with an empty lib
    const lib = {}

    // Add minimal required sections
    lib.trivial = {}

    return { lib }
}

Deno.test("nixpkgs.lib file loading", async (t) => {
    await t.step("load ascii-table.nix (no imports, no dependencies)", () => {
        const asciiTable = loadLibFile("ascii-table.nix")

        // Verify it's an attribute set
        assertExists(asciiTable)
        assertEquals(typeof asciiTable, "object")

        // Check some known values
        assertEquals(asciiTable[" "], 32n)
        assertEquals(asciiTable["A"], 65n)
        assertEquals(asciiTable["a"], 97n)
        assertEquals(asciiTable["0"], 48n)

        // Check escape sequences
        assertEquals(asciiTable["\t"], 9n)
        assertEquals(asciiTable["\n"], 10n)
        assertEquals(asciiTable["\r"], 13n)

        console.log("✅ ascii-table.nix loaded successfully")
    })

    await t.step("verify ascii-table structure", () => {
        const asciiTable = loadLibFile("ascii-table.nix")

        // Should have entries for printable ASCII (32-126)
        // Plus some control characters
        const keys = Object.keys(asciiTable)

        // Verify we have a good number of entries (should be ~100)
        assertEquals(keys.length >= 96, true, `Expected at least 96 ASCII entries, got ${keys.length}`)

        // Verify all values are BigInts (Nix integers)
        for (const [char, code] of Object.entries(asciiTable)) {
            assertEquals(typeof code, "bigint", `Character '${char}' should have BigInt code`)
            assertEquals(code >= 0n, true, `Character '${char}' should have non-negative code`)
            assertEquals(code <= 127n, true, `Character '${char}' should have ASCII code <= 127`)
        }

        console.log(`✅ ascii-table has ${keys.length} entries, all valid`)
    })

    await t.step("test inherit_from syntax (inherit (expr) attrs)", () => {
        // Test that inherit_from works in let expressions
        const nixCode = `let inherit (builtins) add sub; in { x = add 10 20; y = sub 30 5; }`

        let jsCode = convertToJs(nixCode)
        // Strip the import statement
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        const runtime = createRuntime()
        const fn = new Function('runtime', `return ${jsCode}`)
        const result = fn(runtime)

        assertEquals(result.x, 30n)
        assertEquals(result.y, 25n)

        console.log("✅ inherit_from in let expressions works")
    })

    await t.step("test inherit_from in attrsets", () => {
        // Test that inherit_from works in attribute sets
        const nixCode = `{ inherit (builtins) add sub; }`

        let jsCode = convertToJs(nixCode)
        // Strip the import statement
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        const runtime = createRuntime()
        const fn = new Function('runtime', `return ${jsCode}`)
        const result = fn(runtime)

        assertExists(result.add)
        assertExists(result.sub)
        assertEquals(typeof result.add, "function")
        assertEquals(typeof result.sub, "function")

        // Test that the functions work
        assertEquals(result.add(5n)(3n), 8n)
        assertEquals(result.sub(10n)(4n), 6n)

        console.log("✅ inherit_from in attrsets works")
    })

    await t.step("load strings.nix with import (imports ascii-table.nix)", () => {
        // strings.nix takes { lib } as argument and imports ascii-table.nix
        // We'll create a minimal lib context to pass to it

        const filePath = join(nixpkgsLibPath, "strings.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        // Translate to JS
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        // Create runtime with import support
        const runtime = createRuntime()
        runtime.runtime.currentFile = filePath  // Set current file for relative imports

        // Remove import statements (we'll pass runtime directly)
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        // Remove multi-line comments (/** ... */) which break Function evaluation
        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')

        // Trim leading/trailing whitespace to avoid ASI issues with "return\n..."
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate using Function constructor
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Verify it's a function
        assertEquals(typeof moduleFactory, "function", "strings.nix should export a function")

        // Create a minimal lib context for testing
        // strings.nix needs lib.trivial.warnIf
        const minimalLib = {
            trivial: {
                warnIf: (cond, msg, val) => val,  // Simplified warnIf
            }
        }

        // Call the module factory with lib argument
        const stringsModule = moduleFactory({ lib: minimalLib })

        // Verify it returned an object
        assertEquals(typeof stringsModule, "object", "strings.nix should return an object")
        assertExists(stringsModule, "strings.nix should return a non-null value")

        // Verify it has some expected string functions
        // (We can't test all functions without a full lib context, but we can check structure)
        assertExists(stringsModule.concatStrings, "strings.nix should have concatStrings")
        assertExists(stringsModule.concatStringsSep, "strings.nix should have concatStringsSep")

        console.log("✅ strings.nix loaded successfully with ascii-table.nix import")
    })

    await t.step("test strings.nix concatStrings function", () => {
        const filePath = join(nixpkgsLibPath, "strings.nix")
        const nixCode = Deno.readTextFileSync(filePath)
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        const runtime = createRuntime()
        runtime.runtime.currentFile = filePath

        // Remove import statements
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        // Remove multi-line comments (/** ... */) which break Function evaluation
        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')

        // Trim leading/trailing whitespace to avoid ASI issues with "return\n..."
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        const minimalLib = {
            trivial: {
                warnIf: (cond, msg, val) => val,
            }
        }
        const stringsModule = moduleFactory({ lib: minimalLib })

        // Test concatStrings
        const result = stringsModule.concatStrings(["hello", " ", "world"])
        assertEquals(result, "hello world")

        console.log("✅ strings.nix concatStrings function works")
    })

    await t.step("load minfeatures.nix (no dependencies)", () => {
        // minfeatures.nix is a simple self-contained file that checks Nix version features
        const filePath = join(nixpkgsLibPath, "minfeatures.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        // Translate to JS
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        // Create runtime
        const runtime = createRuntime()

        // Remove import statements
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        // Remove multi-line comments
        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const minfeatures = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Verify structure
        assertExists(minfeatures)
        assertEquals(typeof minfeatures, "object")

        // Should have three keys: all, supported, missing
        assertExists(minfeatures.all, "minfeatures should have 'all' property")
        assertExists(minfeatures.supported, "minfeatures should have 'supported' property")
        assertExists(minfeatures.missing, "minfeatures should have 'missing' property")

        // All should be an array
        assertEquals(Array.isArray(minfeatures.all), true, "'all' should be an array")
        assertEquals(Array.isArray(minfeatures.supported), true, "'supported' should be an array")
        assertEquals(Array.isArray(minfeatures.missing), true, "'missing' should be an array")

        // Our implementation should support nixVersion and version >= 2.18
        // (We emulate Nix 2.18 in our builtins)
        assertEquals(minfeatures.supported.length, 2, "Should support 2 features")
        assertEquals(minfeatures.missing.length, 0, "Should have 0 missing features")

        console.log("✅ minfeatures.nix loaded and evaluated correctly")
    })

    await t.step("load source-types.nix (requires lib.mapAttrs)", () => {
        // source-types.nix takes { lib } and uses lib.mapAttrs
        const filePath = join(nixpkgsLibPath, "source-types.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        // Translate to JS
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        // Create runtime
        const runtime = createRuntime()

        // Remove import statements
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Create lib with mapAttrs
        const minimalLib = {
            mapAttrs: runtime.runtime.builtins.mapAttrs
        }

        // Call module factory
        const sourceTypes = moduleFactory({ lib: minimalLib })

        // Verify structure
        assertExists(sourceTypes)
        assertEquals(typeof sourceTypes, "object")

        // Should have the 4 source types
        assertExists(sourceTypes.fromSource, "Should have fromSource")
        assertExists(sourceTypes.binaryNativeCode, "Should have binaryNativeCode")
        assertExists(sourceTypes.binaryBytecode, "Should have binaryBytecode")
        assertExists(sourceTypes.binaryFirmware, "Should have binaryFirmware")

        // Check fromSource properties
        assertEquals(sourceTypes.fromSource.shortName, "fromSource")
        assertEquals(sourceTypes.fromSource.isSource, true)

        // Check binaryNativeCode properties
        assertEquals(sourceTypes.binaryNativeCode.shortName, "binaryNativeCode")
        assertEquals(sourceTypes.binaryNativeCode.isSource, false)

        console.log("✅ source-types.nix loaded and evaluated correctly")
    })

    await t.step("test versions.nix major/minor/patch functions", () => {
        // versions.nix has simple utility functions for version parsing
        const filePath = join(nixpkgsLibPath, "versions.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        const runtime = createRuntime()

        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        const versions = moduleFactory({ lib: {} })

        // Verify structure
        assertExists(versions)
        assertEquals(typeof versions, "object")

        // Test major function
        assertExists(versions.major)
        assertEquals(typeof versions.major, "function")
        assertEquals(versions.major("1.2.3"), "1")
        assertEquals(versions.major("10.20.30"), "10")

        // Test minor function
        assertExists(versions.minor)
        assertEquals(typeof versions.minor, "function")
        assertEquals(versions.minor("1.2.3"), "2")
        assertEquals(versions.minor("10.20.30"), "20")

        // Test patch function
        assertExists(versions.patch)
        assertEquals(typeof versions.patch, "function")
        assertEquals(versions.patch("1.2.3"), "3")
        assertEquals(versions.patch("10.20.30"), "30")

        console.log("✅ versions.nix major/minor/patch functions work")
    })

    await t.step("test kernel.nix configuration helpers", () => {
        // kernel.nix provides helpers for Linux kernel configuration
        const filePath = join(nixpkgsLibPath, "kernel.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        const runtime = createRuntime()

        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Provide minimal lib with mkIf, versionAtLeast, versionOlder
        const minimalLib = {
            mkIf: (cond, val) => cond ? val : null,
            versionAtLeast: (v1, v2) => runtime.runtime.builtins.compareVersions(v1, v2) >= 0n,
            versionOlder: (v1, v2) => runtime.runtime.builtins.compareVersions(v1, v2) < 0n,
        }

        const kernel = moduleFactory({ lib: minimalLib })

        // Verify structure
        assertExists(kernel)
        assertEquals(typeof kernel, "object")

        // Test option function
        assertExists(kernel.option)
        assertEquals(typeof kernel.option, "function")
        const opt = kernel.option({ foo: "bar" })
        assertEquals(opt.foo, "bar")
        assertEquals(opt.optional, true)

        // Test kernel state constants
        assertExists(kernel.yes)
        assertEquals(kernel.yes.tristate, "y")
        assertEquals(kernel.yes.optional, false)

        assertExists(kernel.no)
        assertEquals(kernel.no.tristate, "n")
        assertEquals(kernel.no.optional, false)

        assertExists(kernel.module)
        assertEquals(kernel.module.tristate, "m")
        assertEquals(kernel.module.optional, false)

        assertExists(kernel.unset)
        assertEquals(kernel.unset.tristate, null)
        assertEquals(kernel.unset.optional, false)

        // Test freeform function
        assertExists(kernel.freeform)
        assertEquals(typeof kernel.freeform, "function")
        const ff = kernel.freeform("test-value")
        assertEquals(ff.freeform, "test-value")
        assertEquals(ff.optional, false)

        // Test whenHelpers
        assertExists(kernel.whenHelpers)
        assertEquals(typeof kernel.whenHelpers, "function")
        const helpers = kernel.whenHelpers("5.10.0")
        assertExists(helpers.whenAtLeast)
        assertExists(helpers.whenOlder)
        assertExists(helpers.whenBetween)

        console.log("✅ kernel.nix configuration helpers work correctly")
    })

    await t.step("load flakes.nix (simple re-export of builtins)", () => {
        // flakes.nix is a very simple file that just re-exports flake-related builtins
        const filePath = join(nixpkgsLibPath, "flakes.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        // Translate to JS
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        // Create runtime
        const runtime = createRuntime()

        // Remove import statements
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        // Remove multi-line comments
        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Call with { lib } argument
        const flakes = moduleFactory({ lib: {} })

        // Verify structure - should re-export builtins.parseFlakeRef and builtins.flakeRefToString
        assertExists(flakes)
        assertEquals(typeof flakes, "object")

        // Check that it has the expected functions
        assertExists(flakes.parseFlakeRef, "flakes should have parseFlakeRef")
        assertExists(flakes.flakeRefToString, "flakes should have flakeRefToString")
        assertEquals(typeof flakes.parseFlakeRef, "function")
        assertEquals(typeof flakes.flakeRefToString, "function")

        // Verify they're actually the builtins functions
        assertEquals(flakes.parseFlakeRef, runtime.runtime.builtins.parseFlakeRef)
        assertEquals(flakes.flakeRefToString, runtime.runtime.builtins.flakeRefToString)

        console.log("✅ flakes.nix loaded successfully (re-exports builtins)")
    })

    await t.step("load flake-version-info.nix (lib overlay for version info)", () => {
        // flake-version-info.nix is a curried function: self: finalLib: prevLib: { ... }
        // It extends lib.trivial with version information from flake metadata
        const filePath = join(nixpkgsLibPath, "flake-version-info.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        // Translate to JS
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        // Create runtime
        const runtime = createRuntime()

        // Remove import statements
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        // Remove multi-line comments
        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const overlayFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Create mock flake self object
        const mockFlakeSelf = {
            lastModifiedDate: "20260205123456",
            shortRev: "abc1234",
            rev: "abc1234567890abcdef1234567890abcdef123456"
        }

        // Create mock prevLib with trivial section
        const mockPrevLib = {
            trivial: {
                version: "1.0.0"
            }
        }

        // Create mock finalLib with substring
        const mockFinalLib = {
            substring: runtime.runtime.builtins.substring
        }

        // Call the curried function: self(finalLib)(prevLib)
        const overlay = overlayFactory(mockFlakeSelf)(mockFinalLib)(mockPrevLib)

        // Verify structure
        assertExists(overlay)
        assertEquals(typeof overlay, "object")
        assertExists(overlay.trivial, "overlay should have trivial")

        // Check versionSuffix format: ".YYYYMMDD.shortRev"
        assertExists(overlay.trivial.versionSuffix)
        // versionSuffix is an InterpolatedString, convert to string
        const versionSuffix = overlay.trivial.versionSuffix.toString()
        assertEquals(typeof versionSuffix, "string")
        assertEquals(versionSuffix, ".20260205.abc1234")

        // Check revisionWithDefault
        assertExists(overlay.trivial.revisionWithDefault)
        assertEquals(typeof overlay.trivial.revisionWithDefault, "function")
        assertEquals(
            overlay.trivial.revisionWithDefault("fallback"),
            "abc1234567890abcdef1234567890abcdef123456"
        )

        // Test with missing rev (should use default)
        const mockFlakeSelfNoRev = {
            lastModifiedDate: "19700101000000",
            shortRev: "dirty"
        }
        const overlay2 = overlayFactory(mockFlakeSelfNoRev)(mockFinalLib)(mockPrevLib)
        assertEquals(overlay2.trivial.versionSuffix.toString(), ".19700101.dirty")
        assertEquals(overlay2.trivial.revisionWithDefault("my-default"), "my-default")

        console.log("✅ flake-version-info.nix loaded successfully (lib overlay)")
    })

    await t.step("load systems/flake-systems.nix (simple list of platforms)", () => {
        // flake-systems.nix is a minimal file that just returns a list of supported platforms
        const filePath = join(nixpkgsLibPath, "systems/flake-systems.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        // Translate to JS
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        // Create runtime
        const runtime = createRuntime()

        // Remove import statements
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        // Remove multi-line comments
        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Call with empty args (takes { })
        const systems = moduleFactory({})

        // Verify it's a list
        assertExists(systems)
        assertEquals(Array.isArray(systems), true, "flake-systems.nix should return a list")

        // Check some known platforms
        assertEquals(systems.includes("x86_64-linux"), true, "Should include x86_64-linux")
        assertEquals(systems.includes("aarch64-linux"), true, "Should include aarch64-linux")
        assertEquals(systems.includes("x86_64-darwin"), true, "Should include x86_64-darwin")
        assertEquals(systems.includes("aarch64-darwin"), true, "Should include aarch64-darwin")

        // Verify all are strings
        for (const sys of systems) {
            assertEquals(typeof sys, "string", `Platform ${sys} should be a string`)
        }

        // Should have 8-10 systems (based on the file content)
        assertEquals(systems.length >= 7, true, `Expected at least 7 platforms, got ${systems.length}`)

        console.log(`✅ flake-systems.nix loaded successfully (${systems.length} platforms)`)
    })

    // Note: licenses.nix skipped - it uses complex function patterns with @attrs syntax
    // combined with optionalAttrs that requires more sophisticated pattern matching support

    await t.step("load systems/supported.nix (rec attrset with platform tiers)", () => {
        // supported.nix is a rec attrset that organizes platforms by tier
        const filePath = join(nixpkgsLibPath, "systems/supported.nix")
        const nixCode = Deno.readTextFileSync(filePath)

        // Translate to JS
        let jsCode = convertToJs(nixCode, { relativePath: filePath })

        // Create runtime
        const runtime = createRuntime()

        // Remove import statements
        if (jsCode.includes('import { createRuntime }')) {
            jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
            jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
        }

        // Remove multi-line comments
        jsCode = jsCode.replace(/\/\*\*[\s\S]*?\*\//g, '')
        jsCode = jsCode.trim()

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.runtime.builtins,
            ...runtime.runtime.builtins
        }

        // Evaluate
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `return (${jsCode})`
        )

        const moduleFactory = evalFunc(
            { scopeStack: [nixScope] },
            runtime.runtime.operators,
            runtime.runtime.builtins,
            nixScope,
            runtime.runtime.InterpolatedString,
            runtime.runtime.Path
        )

        // Call with { lib } argument
        const supported = moduleFactory({ lib: {} })

        // Verify structure
        assertExists(supported)
        assertEquals(typeof supported, "object")

        // Check tier1
        assertExists(supported.tier1, "Should have tier1")
        assertEquals(Array.isArray(supported.tier1), true, "tier1 should be a list")
        assertEquals(supported.tier1.includes("x86_64-linux"), true, "tier1 should include x86_64-linux")

        // Check tier2
        assertExists(supported.tier2, "Should have tier2")
        assertEquals(Array.isArray(supported.tier2), true, "tier2 should be a list")
        assertEquals(supported.tier2.includes("aarch64-linux"), true, "tier2 should include aarch64-linux")
        assertEquals(supported.tier2.includes("x86_64-darwin"), true, "tier2 should include x86_64-darwin")

        // Check tier3
        assertExists(supported.tier3, "Should have tier3")
        assertEquals(Array.isArray(supported.tier3), true, "tier3 should be a list")
        assertEquals(supported.tier3.includes("armv6l-linux"), true, "tier3 should include armv6l-linux")

        // Check hydra (computed from tier1 ++ tier2 ++ tier3 ++ ["aarch64-darwin"])
        assertExists(supported.hydra, "Should have hydra")
        assertEquals(Array.isArray(supported.hydra), true, "hydra should be a list")

        // Verify hydra contains elements from all tiers
        assertEquals(supported.hydra.includes("x86_64-linux"), true, "hydra should include tier1 platforms")
        assertEquals(supported.hydra.includes("aarch64-linux"), true, "hydra should include tier2 platforms")
        assertEquals(supported.hydra.includes("armv6l-linux"), true, "hydra should include tier3 platforms")
        assertEquals(supported.hydra.includes("aarch64-darwin"), true, "hydra should include aarch64-darwin")

        // Verify rec evaluation: hydra should be the concatenation of all tiers + extra
        const expectedHydraLength = supported.tier1.length + supported.tier2.length + supported.tier3.length + 1
        assertEquals(supported.hydra.length, expectedHydraLength, "hydra length should match tier1 + tier2 + tier3 + 1")

        console.log(`✅ supported.nix loaded successfully (${supported.hydra.length} hydra platforms)`)
    })

    // Note: zip-int-bits.nix is skipped because it uses complex closures with asserts
    // that reference builtins at call-time, which requires more sophisticated scope
    // management than our current test harness provides. The translator works correctly,
    // but testing it requires maintaining runtime.scopeStack across function calls.
})

console.log("\n🚀 Testing nixpkgs.lib file loading")
console.log("=" .repeat(60))
