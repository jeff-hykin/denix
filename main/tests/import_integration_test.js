/**
 * Integration tests for builtins.import and builtins.scopedImport
 */

import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { createRuntime } from "../runtime.js"
import { resolve as pathResolve } from "https://deno.land/std@0.224.0/path/mod.ts"

// Create test directory structure
const testDir = pathResolve("./test_import_integration_temp")

// Setup function
async function setup() {
    // Clean up if exists
    try {
        await Deno.remove(testDir, { recursive: true })
    } catch {
        // Doesn't exist, that's fine
    }

    // Create test structure
    await Deno.mkdir(testDir, { recursive: true })
    await Deno.mkdir(`${testDir}/subdir`, { recursive: true })

    // Create test files
    await Deno.writeTextFile(`${testDir}/simple.nix`, `42`)
    await Deno.writeTextFile(`${testDir}/string.nix`, `"hello"`)
    await Deno.writeTextFile(`${testDir}/attrset.nix`, `{ a = 1; b = 2; }`)
    await Deno.writeTextFile(`${testDir}/function.nix`, `x: x + 1`)
    await Deno.writeTextFile(`${testDir}/data.json`, `{"x": 10, "y": 20}`)

    // Test with builtins
    await Deno.writeTextFile(`${testDir}/with_builtins.nix`, `
        builtins.add 5 10
    `)

    // Test relative import
    await Deno.writeTextFile(`${testDir}/imports_sibling.nix`, `
        let helper = import ./simple.nix;
        in helper + 8
    `)

    // Test nested import
    await Deno.writeTextFile(`${testDir}/subdir/nested.nix`, `100`)
    await Deno.writeTextFile(`${testDir}/imports_nested.nix`, `
        import ./subdir/nested.nix
    `)

    // Test import with function application
    await Deno.writeTextFile(`${testDir}/uses_function.nix`, `
        let inc = import ./function.nix;
        in inc 5
    `)

    // Test JSON import
    await Deno.writeTextFile(`${testDir}/imports_json.nix`, `
        let data = import ./data.json;
        in data.x + data.y
    `)
}

// Cleanup function
async function cleanup() {
    try {
        await Deno.remove(testDir, { recursive: true })
    } catch {
        // Already cleaned up
    }
}

Deno.test({
    name: "builtins.import integration tests",
    fn: async (t) => {
        await setup()

        try {
            await t.step("import simple value", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                const result = runtime.runtime.builtins.import(`${testDir}/simple.nix`)
                assertEquals(result, 42n)
            })

            await t.step("import string", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                const result = runtime.runtime.builtins.import(`${testDir}/string.nix`)
                assertEquals(result, "hello")
            })

            await t.step("import attrset", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                const result = runtime.runtime.builtins.import(`${testDir}/attrset.nix`)
                assertEquals(result.a, 1n)
                assertEquals(result.b, 2n)
            })

            await t.step("import function", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                const inc = runtime.runtime.builtins.import(`${testDir}/function.nix`)
                const result = inc(5n)
                assertEquals(result, 6n)
            })

            await t.step("import JSON file", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                const result = runtime.runtime.builtins.import(`${testDir}/data.json`)
                assertEquals(result.x, 10n)
                assertEquals(result.y, 20n)
            })

            await t.step("import with builtins", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                const result = runtime.runtime.builtins.import(`${testDir}/with_builtins.nix`)
                assertEquals(result, 15n)
            })

            await t.step("import caching works", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                // First import
                const result1 = runtime.runtime.builtins.import(`${testDir}/simple.nix`)

                // Second import (should be cached)
                const result2 = runtime.runtime.builtins.import(`${testDir}/simple.nix`)

                // Should be the same value
                assertEquals(result1, result2)
                assertEquals(result1, 42n)

                // Verify cache was used
                assertEquals(runtime.importCache.has(`${testDir}/simple.nix`), true)
            })

            await t.step("import nonexistent file throws error", () => {
                const runtime = createRuntime()
                runtime.runtime.currentFile = `${testDir}/main.nix`

                assertThrows(
                    () => runtime.runtime.builtins.import(`${testDir}/nonexistent.nix`),
                    Error,
                    "does not exist"
                )
            })

            // Note: Nested imports and circular import tests require full translator integration
            // These will be tested in a separate end-to-end test file

        } finally {
            await cleanup()
        }
    }
})

