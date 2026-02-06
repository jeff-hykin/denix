#!/usr/bin/env -S deno run --allow-all
// Generic test harness for comparing Nix and JavaScript outputs

import { run, returnAsString, Stdout, Stderr } from "https://deno.land/x/quickr@0.6.51/main/run.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

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
export async function runNix(nixExpr) {
    try {
        const output = await run`nix eval --json --expr ${nixExpr} ${Stdout(returnAsString)} ${Stderr(returnAsString)}`
        return JSON.parse(output.trim())
    } catch (e) {
        throw new Error(`Nix evaluation failed: ${e.message}`)
    }
}

/**
 * Serialize a value to JSON, handling BigInts
 */
export function serializeToJSON(value) {
    return JSON.parse(JSON.stringify(value, (k, v) =>
        typeof v === 'bigint' ? Number(v) : v
    ))
}

/**
 * Deep comparison that handles various types
 */
export function deepEqual(a, b, path = "root") {
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
 * Test a builtin or operator expression
 */
export async function test(testNum, description, nixExpr, jsValue, options = {}) {
    const testName = `${String(testNum).padStart(3, '0')} - ${description}`

    if (options.skip) {
        console.log(`⊘ SKIP: ${testName}`)
        results.skipped++
        results.tests.push({ name: testName, status: "skipped", reason: options.skipReason || "Skipped" })
        return
    }

    try {
        // Run Nix
        const nixResult = await runNix(nixExpr)

        // Serialize JS value
        const jsResult = serializeToJSON(jsValue)

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
