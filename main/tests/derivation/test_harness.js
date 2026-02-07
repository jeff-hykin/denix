#!/usr/bin/env -S deno run --allow-all
// Test harness for comparing Nix and JavaScript derivation outputs

// Test result tracking
const results = {
    passed: 0,
    failed: 0,
    skipped: 0,
    tests: []
}

/**
 * Run a Nix expression and capture its JSON output
 */
async function runNix(nixExpr) {
    try {
        const command = new Deno.Command("nix", {
            args: ["eval", "--json", "--expr", nixExpr],
            stdout: "piped",
            stderr: "piped"
        })
        const { success, stdout, stderr } = await command.output()

        if (!success) {
            const errorText = new TextDecoder().decode(stderr)
            throw new Error(`Nix command failed: ${errorText}`)
        }

        const output = new TextDecoder().decode(stdout)
        return JSON.parse(output.trim())
    } catch (e) {
        throw new Error(`Nix evaluation failed: ${e.message}`)
    }
}

/**
 * Run JavaScript derivation code and capture output
 */
async function runJS(jsCode) {
    try {
        // Create a temporary file with the JS code
        const tempFile = `/tmp/denix_test_${Date.now()}.js`
        const runtimePath = new URL("../../runtime.js", import.meta.url).pathname

        const fileContent = `
import { builtins } from "${runtimePath}"

// Wrap in async function to handle promises
await (async () => {
    ${jsCode}

    // Await result if it's a promise
    const finalResult = result instanceof Promise ? await result : result

    // Export the result as JSON
    console.log(JSON.stringify(finalResult, (k, v) => typeof v === 'bigint' ? Number(v) : v))
})()
`
        await Deno.writeTextFile(tempFile, fileContent)

        const command = new Deno.Command("deno", {
            args: ["run", "--allow-all", tempFile],
            stdout: "piped",
            stderr: "piped"
        })
        const { success, stdout, stderr } = await command.output()
        await Deno.remove(tempFile)

        if (!success) {
            const errorText = new TextDecoder().decode(stderr)
            throw new Error(`Deno command failed: ${errorText}`)
        }

        const output = new TextDecoder().decode(stdout)
        if (!output || output.trim() === "") {
            throw new Error("No output from JS execution")
        }

        return JSON.parse(output.trim())
    } catch (e) {
        throw new Error(`JS evaluation failed: ${e.message}`)
    }
}

/**
 * Deep comparison that handles various types
 */
function deepEqual(a, b, path = "root") {
    if (a === b) return { equal: true }

    if (typeof a !== typeof b) {
        return { equal: false, reason: `Type mismatch at ${path}: ${typeof a} vs ${typeof b}` }
    }

    if (Array.isArray(a) !== Array.isArray(b)) {
        return { equal: false, reason: `Array mismatch at ${path}` }
    }

    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return { equal: false, reason: `Array length mismatch at ${path}: ${a.length} vs ${b.length}` }
        }
        for (let i = 0; i < a.length; i++) {
            const result = deepEqual(a[i], b[i], `${path}[${i}]`)
            if (!result.equal) return result
        }
        return { equal: true }
    }

    if (a && typeof a === 'object' && b && typeof b === 'object') {
        const keysA = Object.keys(a).sort()
        const keysB = Object.keys(b).sort()

        if (keysA.length !== keysB.length) {
            return { equal: false, reason: `Object key count mismatch at ${path}: ${keysA.length} vs ${keysB.length}` }
        }

        for (let i = 0; i < keysA.length; i++) {
            if (keysA[i] !== keysB[i]) {
                return { equal: false, reason: `Object key mismatch at ${path}: ${keysA[i]} vs ${keysB[i]}` }
            }
        }

        for (const key of keysA) {
            const result = deepEqual(a[key], b[key], `${path}.${key}`)
            if (!result.equal) return result
        }
        return { equal: true }
    }

    return { equal: false, reason: `Value mismatch at ${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}` }
}

/**
 * Test a derivation expression
 */
export async function testDerivation(testNum, description, nixExpr, jsCode, options = {}) {
    const testName = `${String(testNum).padStart(3, '0')} - ${description}`

    if (options.skip) {
        console.log(`⊘ SKIP: ${testName}`)
        results.skipped++
        results.tests.push({ name: testName, status: "skipped", reason: options.skipReason || "Skipped" })
        return
    }

    try {
        // Run both Nix and JS
        const nixResult = await runNix(nixExpr)
        const jsResult = await runJS(jsCode)

        // Compare results
        const comparison = deepEqual(nixResult, jsResult)

        if (comparison.equal) {
            console.log(`✓ PASS: ${testName}`)
            results.passed++
            results.tests.push({ name: testName, status: "passed" })
        } else {
            console.log(`✗ FAIL: ${testName}`)
            console.log(`  Reason: ${comparison.reason}`)
            console.log(`  Nix:`, JSON.stringify(nixResult, null, 2))
            console.log(`  JS:`, JSON.stringify(jsResult, null, 2))
            results.failed++
            results.tests.push({
                name: testName,
                status: "failed",
                reason: comparison.reason,
                nixResult,
                jsResult
            })
        }
    } catch (e) {
        console.log(`✗ ERROR: ${testName}`)
        console.log(`  ${e.message}`)
        results.failed++
        results.tests.push({ name: testName, status: "error", error: e.message })
    }
}

/**
 * Print summary
 */
export function printSummary() {
    console.log("\n" + "=".repeat(60))
    console.log(`Total: ${results.passed + results.failed + results.skipped} tests`)
    console.log(`✓ Passed: ${results.passed}`)
    console.log(`✗ Failed: ${results.failed}`)
    console.log(`⊘ Skipped: ${results.skipped}`)
    console.log("=".repeat(60))

    if (results.failed > 0) {
        Deno.exit(1)
    }
}

export { results }
