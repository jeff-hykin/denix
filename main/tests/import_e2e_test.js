/**
 * End-to-end tests for import system with translator
 * Tests the full pipeline: Nix code → Translator → JS → Evaluation with imports
 */

import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { convertToJs } from "../../translator.js"
import { createRuntime } from "../runtime.js"
import { resolve as pathResolve } from "https://deno.land/std@0.224.0/path/mod.ts"

// Create test directory structure
const testDir = pathResolve("./test_import_e2e_temp")

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
    await Deno.mkdir(`${testDir}/lib`, { recursive: true })

    // Create test files
    await Deno.writeTextFile(`${testDir}/constants.nix`, `
        {
            version = "1.0.0";
            port = 8080;
        }
    `)

    await Deno.writeTextFile(`${testDir}/lib/math.nix`, `
        {
            add = x: y: x + y;
            multiply = x: y: x * y;
            square = x: x * x;
        }
    `)

    await Deno.writeTextFile(`${testDir}/lib/strings.nix`, `
        {
            concat = a: b: a + b;
            uppercase = builtins.replaceStrings
                ["a" "b" "c" "d" "e"]
                ["A" "B" "C" "D" "E"];
        }
    `)

    await Deno.writeTextFile(`${testDir}/uses_import.nix`, `
        let
            constants = import ./constants.nix;
            math = import ./lib/math.nix;
        in
        {
            port = constants.port;
            computed = math.add 10 20;
            squared = math.square 5;
        }
    `)

    await Deno.writeTextFile(`${testDir}/nested_imports.nix`, `
        let
            # Import a file that itself imports
            result = import ./uses_import.nix;
        in
        result.port + result.computed
    `)

    await Deno.writeTextFile(`${testDir}/import_sibling.nix`, `
        let
            constants = import ./constants.nix;
        in
        constants.version
    `)

    await Deno.writeTextFile(`${testDir}/data.json`, `
        {
            "users": 100,
            "items": 250
        }
    `)

    await Deno.writeTextFile(`${testDir}/import_json.nix`, `
        let
            data = import ./data.json;
        in
        data.users + data.items
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

// Helper to evaluate Nix file
function evaluateNixFile(filepath, runtime) {
    const content = Deno.readTextFileSync(filepath)
    let jsCode = convertToJs(content)

    // Remove import statements (runtime is already available)
    if (jsCode.includes('import { createRuntime }')) {
        jsCode = jsCode.replace(/import \{ createRuntime \}.*\n/, '')
        jsCode = jsCode.replace(/const runtime = createRuntime\(\)\n/, '')
    }

    // Set current file for relative imports
    runtime.runtime.currentFile = filepath

    // Create evaluation scope
    const nixScope = {
        builtins: runtime.runtime.builtins,
        ...runtime.runtime.builtins
    }

    // Filter out comment-only lines
    const lines = jsCode.split('\n')
    const codeLines = lines.filter(line => {
        const trimmed = line.trim()
        return trimmed.length > 0 && !trimmed.startsWith('//')
    })
    const cleanCode = codeLines.join('\n')

    // Evaluate
    const evalFunc = new Function(
        'runtime',
        'operators',
        'builtins',
        'nixScope',
        'InterpolatedString',
        'Path',
        `return ${cleanCode}`
    )

    return evalFunc(
        { scopeStack: [nixScope] },
        runtime.runtime.operators,
        runtime.runtime.builtins,
        nixScope,
        runtime.runtime.InterpolatedString,
        runtime.runtime.Path
    )
}

Deno.test({
    name: "import end-to-end tests",
    fn: async (t) => {
        await setup()

        try {
            await t.step("import simple attrset", () => {
                const runtime = createRuntime()
                const result = evaluateNixFile(`${testDir}/import_sibling.nix`, runtime)
                assertEquals(result, "1.0.0")
            })

            await t.step("import and use functions", () => {
                const runtime = createRuntime()
                const result = evaluateNixFile(`${testDir}/uses_import.nix`, runtime)

                assertEquals(result.port, 8080n)
                assertEquals(result.computed, 30n)
                assertEquals(result.squared, 25n)
            })

            await t.step("nested imports (import file that imports)", () => {
                const runtime = createRuntime()
                const result = evaluateNixFile(`${testDir}/nested_imports.nix`, runtime)

                // Should be constants.port (8080) + math.add 10 20 (30) = 8110
                assertEquals(result, 8110n)
            })

            await t.step("import JSON file", () => {
                const runtime = createRuntime()
                const result = evaluateNixFile(`${testDir}/import_json.nix`, runtime)

                // Should be users (100) + items (250) = 350
                assertEquals(result, 350n)
            })

            await t.step("import caching prevents re-evaluation", () => {
                const runtime = createRuntime()

                // Evaluate file that imports constants.nix
                const result1 = evaluateNixFile(`${testDir}/import_sibling.nix`, runtime)
                assertEquals(result1, "1.0.0")

                // Verify constants.nix is in cache
                const cachedPath = `${testDir}/constants.nix`
                assertEquals(runtime.importCache.has(cachedPath), true)

                // Evaluate another file that also imports constants.nix
                // Should use cached version
                const result2 = evaluateNixFile(`${testDir}/uses_import.nix`, runtime)
                assertEquals(result2.port, 8080n)
            })

            await t.step("import with Path type", async () => {
                const runtime = createRuntime()

                // Create a Nix file that uses path syntax
                const pathFile = `${testDir}/uses_path.nix`
                await Deno.writeTextFile(pathFile, `
                    let
                        constants = import ./constants.nix;
                    in
                    constants.port
                `)

                const result = evaluateNixFile(pathFile, runtime)
                assertEquals(result, 8080n)
            })

        } finally {
            await cleanup()
        }
    }
})

