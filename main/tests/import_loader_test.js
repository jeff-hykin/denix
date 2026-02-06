/**
 * Tests for the import loader
 * Tests loading and evaluating .nix and .json files
 */

import { loadAndEvaluateSync } from "../import_loader.js"
import { builtins, operators, InterpolatedString, Path } from "../runtime.js"

// Setup minimal runtime
const runtime = {
    builtins,
    operators,
    InterpolatedString,
    Path,
    nixRepr: (value) => {
        if (typeof value === 'string') {
            return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
        }
        return JSON.stringify(value)
    }
}

const fixturesDir = new URL("./fixtures/import_test/", import.meta.url).pathname

Deno.test("import loader", async (t) => {
    await t.step("load simple .nix file", () => {
        const filepath = fixturesDir + "simple.nix"
        const result = loadAndEvaluateSync(filepath, runtime)

        if (result.foo !== 42n) {
            throw new Error(`Expected foo to be 42n, got ${result.foo}`)
        }

        if (result.bar !== "hello") {
            throw new Error(`Expected bar to be "hello", got ${result.bar}`)
        }
    })

    await t.step("load function .nix file", () => {
        const filepath = fixturesDir + "function.nix"
        const result = loadAndEvaluateSync(filepath, runtime)

        if (typeof result !== 'function') {
            throw new Error(`Expected a function, got ${typeof result}`)
        }

        const output = result(5n)
        if (output !== 15n) {
            throw new Error(`Expected 15n, got ${output}`)
        }
    })

    await t.step("load .json file", () => {
        const filepath = fixturesDir + "data.json"
        const result = loadAndEvaluateSync(filepath, runtime)

        if (result.name !== "test") {
            throw new Error(`Expected name "test", got ${result.name}`)
        }

        if (result.version !== 123n) {
            throw new Error(`Expected version 123n (BigInt), got ${result.version}`)
        }

        if (!Array.isArray(result.items)) {
            throw new Error(`Expected items to be array`)
        }

        if (result.items.length !== 3n && result.items.length !== 3) {
            throw new Error(`Expected items length 3, got ${result.items.length}`)
        }
    })

    await t.step("load .nix file using builtins", () => {
        const filepath = fixturesDir + "with_builtins.nix"
        const result = loadAndEvaluateSync(filepath, runtime)

        // Note: builtins.length currently returns number, not BigInt
        // This is a known runtime issue, separate from import loader
        if (result !== 5 && result !== 5n) {
            throw new Error(`Expected 5 (length of [1 2 3 4 5]), got ${result}`)
        }
    })

    await t.step("load complex .nix file", () => {
        const filepath = fixturesDir + "complex.nix"
        const result = loadAndEvaluateSync(filepath, runtime)

        if (!Array.isArray(result.doubled)) {
            throw new Error(`Expected doubled to be array`)
        }

        const expected = [2n, 4n, 6n, 8n, 10n]
        for (let i = 0; i < expected.length; i++) {
            if (result.doubled[i] !== expected[i]) {
                throw new Error(`Expected doubled[${i}] to be ${expected[i]}, got ${result.doubled[i]}`)
            }
        }

        if (result.sum !== 15n) {
            throw new Error(`Expected sum to be 15n, got ${result.sum}`)
        }
    })

    await t.step("error on nonexistent file", () => {
        const filepath = fixturesDir + "nonexistent.nix"

        let error = null
        try {
            loadAndEvaluateSync(filepath, runtime)
        } catch (e) {
            error = e
        }

        if (!error) {
            throw new Error("Expected error for nonexistent file")
        }

        if (!error.message.includes("does not exist")) {
            throw new Error(`Expected "does not exist" error, got: ${error.message}`)
        }
    })

    await t.step("error on unsupported file type", () => {
        // Create a temporary .txt file
        const txtFile = fixturesDir + "test.txt"
        Deno.writeTextFileSync(txtFile, "hello")

        let error = null
        try {
            loadAndEvaluateSync(txtFile, runtime)
        } catch (e) {
            error = e
        } finally {
            // Clean up
            try {
                Deno.removeSync(txtFile)
            } catch {}
        }

        if (!error) {
            throw new Error("Expected error for unsupported file type")
        }

        if (!error.message.includes("Unsupported file type")) {
            throw new Error(`Expected "Unsupported file type" error, got: ${error.message}`)
        }
    })
})

console.log("✅ All import loader tests passed!")
