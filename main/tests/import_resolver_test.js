/**
 * Tests for import path resolution
 */

import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { resolveImportPath, getImportType, validateImportPath } from "../../tools/import_resolver.js"
import { resolve as pathResolve } from "https://deno.land/std@0.224.0/path/mod.ts"

// Create test directory structure
const testDir = pathResolve("./test_imports_temp")

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
    await Deno.mkdir(`${testDir}/with-default`, { recursive: true })

    // Create test files
    await Deno.writeTextFile(`${testDir}/main.nix`, "{ a = 1; }")
    await Deno.writeTextFile(`${testDir}/helper.nix`, "{ b = 2; }")
    await Deno.writeTextFile(`${testDir}/data.json`, '{"c": 3}')
    await Deno.writeTextFile(`${testDir}/subdir/nested.nix`, "{ d = 4; }")
    await Deno.writeTextFile(`${testDir}/with-default/default.nix`, "{ e = 5; }")
    await Deno.writeTextFile(`${testDir}/noextension`, "{ f = 6; }")
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
    name: "import resolver",
    fn: async (t) => {
        await setup()

        try {
            await t.step("resolveImportPath - absolute path", () => {
                const from = `${testDir}/main.nix`
                const result = resolveImportPath(from, `${testDir}/helper.nix`)
                assertEquals(result, `${testDir}/helper.nix`)
            })

            await t.step("resolveImportPath - relative sibling", () => {
                const from = `${testDir}/main.nix`
                const result = resolveImportPath(from, "./helper.nix")
                assertEquals(result, `${testDir}/helper.nix`)
            })

            await t.step("resolveImportPath - relative subdirectory", () => {
                const from = `${testDir}/main.nix`
                const result = resolveImportPath(from, "./subdir/nested.nix")
                assertEquals(result, `${testDir}/subdir/nested.nix`)
            })

            await t.step("resolveImportPath - relative parent", () => {
                const from = `${testDir}/subdir/nested.nix`
                const result = resolveImportPath(from, "../helper.nix")
                assertEquals(result, `${testDir}/helper.nix`)
            })

            await t.step("resolveImportPath - directory with default.nix", () => {
                const from = `${testDir}/main.nix`
                const result = resolveImportPath(from, "./with-default")
                assertEquals(result, `${testDir}/with-default/default.nix`)
            })

            await t.step("resolveImportPath - infer .nix extension", () => {
                const from = `${testDir}/main.nix`
                const result = resolveImportPath(from, "./helper")
                assertEquals(result, `${testDir}/helper.nix`)
            })

            await t.step("getImportType - .nix file", () => {
                assertEquals(getImportType(`${testDir}/main.nix`), "nix")
            })

            await t.step("getImportType - .json file", () => {
                assertEquals(getImportType(`${testDir}/data.json`), "json")
            })

            await t.step("getImportType - no extension", () => {
                assertEquals(getImportType(`${testDir}/noextension`), "unknown")
            })

            await t.step("validateImportPath - existing file", () => {
                // Should not throw
                validateImportPath(`${testDir}/main.nix`)
            })

            await t.step("validateImportPath - non-existent file", () => {
                assertThrows(
                    () => validateImportPath(`${testDir}/nonexistent.nix`),
                    Error,
                    "does not exist"
                )
            })

            await t.step("validateImportPath - directory", () => {
                assertThrows(
                    () => validateImportPath(`${testDir}/subdir`),
                    Error,
                    "not a file"
                )
            })

            await t.step("resolveImportPath - complex relative path", () => {
                const from = `${testDir}/subdir/nested.nix`
                const result = resolveImportPath(from, "../with-default")
                assertEquals(result, `${testDir}/with-default/default.nix`)
            })

            await t.step("resolveImportPath - json file", () => {
                const from = `${testDir}/main.nix`
                const result = resolveImportPath(from, "./data.json")
                assertEquals(result, `${testDir}/data.json`)
            })
        } finally {
            await cleanup()
        }
    }
})

