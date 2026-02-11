#!/usr/bin/env -S deno run --allow-all
/**
 * Translation Validator
 *
 * Compares Nix CLI evaluation with Denix translation + evaluation
 * to ensure correctness of the translator
 */

import { parse } from "../tools/parsing.js"
import { convertToJs } from "../translator.js"
import { createRuntime } from "../main/runtime.js"

// ANSI colors for output
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
}

/**
 * Evaluate a Nix expression using the Nix CLI
 */
async function evaluateWithNix(nixExpr) {
    try {
        // Write expression to temp file
        const tempFile = await Deno.makeTempFile({ suffix: ".nix" })
        await Deno.writeTextFile(tempFile, nixExpr)

        // Run nix eval
        const cmd = new Deno.Command("nix", {
            args: [
                "eval",
                "--expr",
                `import ${tempFile}`,
                "--json",     // Output as JSON
                "--impure",   // Allow impure operations
            ],
            stdout: "piped",
            stderr: "piped",
        })

        const result = await cmd.output()

        // Clean up temp file
        await Deno.remove(tempFile)

        if (result.code !== 0) {
            const stderr = new TextDecoder().decode(result.stderr)
            return {
                success: false,
                error: stderr,
            }
        }

        const stdout = new TextDecoder().decode(result.stdout)
        return {
            success: true,
            value: JSON.parse(stdout),
            raw: stdout,
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

/**
 * Evaluate a Nix expression using Denix translator + runtime
 */
async function evaluateWithDenix(nixExpr) {
    try {
        // Translate to JS
        let jsCode = await convertToJs(nixExpr)

        // Create runtime
        const runtimeContext = createRuntime()
        const runtime = runtimeContext.runtime

        // Create evaluation scope
        const nixScope = {
            builtins: runtime.builtins,
            ...runtime.builtins,
        }
        runtimeContext.scopeStack.push(nixScope)

        // Strip import, export, and runtime creation (we provide our own)
        jsCode = jsCode
            .replace(/^import\s+.*$/gm, '')  // Remove import lines
            .replace(/^const\s+runtime\s+=\s+createRuntime\(\).*$/gm, '')  // Remove runtime creation
            .replace(/^const\s+operators\s+=\s+.*$/gm, '')  // Remove operators extraction
            .replace(/^const\s+builtins\s+=\s+.*$/gm, '')  // Remove builtins extraction
            .replace(/^export\s+default\s+/m, '')  // Remove export default
            .trim()

        // Evaluate the generated JS
        const evalFunc = new Function(
            'runtime',
            'operators',
            'builtins',
            'nixScope',
            'InterpolatedString',
            'Path',
            `"use strict"; return ${jsCode}`
        )

        let result = evalFunc(
            runtimeContext,
            runtime.operators,
            runtime.builtins,
            nixScope,
            runtime.InterpolatedString,
            runtime.Path
        )

        // Await result if it's a promise
        if (result instanceof Promise) {
            result = await result
        }

        // Convert to JSON-serializable form
        let jsonResult = runtime.builtins.toJSON(result)

        // Await toJSON if it's a promise
        if (jsonResult instanceof Promise) {
            jsonResult = await jsonResult
        }

        return {
            success: true,
            value: JSON.parse(jsonResult),
            jsCode: jsCode,
            raw: jsonResult,
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
            stack: error.stack,
        }
    }
}

/**
 * Deep equality check for values
 */
function deepEqual(a, b) {
    if (a === b) return true
    if (a == null || b == null) return false
    if (typeof a !== typeof b) return false

    if (typeof a === 'object') {
        const keysA = Object.keys(a).sort()
        const keysB = Object.keys(b).sort()

        if (keysA.length !== keysB.length) return false
        if (keysA.join(',') !== keysB.join(',')) return false

        for (const key of keysA) {
            if (!deepEqual(a[key], b[key])) return false
        }
        return true
    }

    return false
}

/**
 * Test a single Nix expression
 */
export async function testExpression(nixExpr, description = "") {
    const nixResult = await evaluateWithNix(nixExpr)
    const denixResult = await evaluateWithDenix(nixExpr)

    const passed =
        nixResult.success &&
        denixResult.success &&
        deepEqual(nixResult.value, denixResult.value)

    return {
        nixExpr,
        description,
        passed,
        nixResult,
        denixResult,
    }
}

/**
 * Print test result
 */
export function printTestResult(result, verbose = false) {
    const status = result.passed
        ? `${colors.green}✓ PASS${colors.reset}`
        : `${colors.red}✗ FAIL${colors.reset}`

    const desc = result.description
        ? ` ${colors.cyan}${result.description}${colors.reset}`
        : ""

    console.log(`${status}${desc}`)

    if (verbose || !result.passed) {
        console.log(`${colors.gray}  Nix: ${result.nixExpr.replace(/\n/g, " ").slice(0, 60)}...${colors.reset}`)

        if (result.nixResult.success) {
            console.log(`${colors.gray}  Nix result: ${JSON.stringify(result.nixResult.value)}${colors.reset}`)
        } else {
            console.log(`${colors.red}  Nix error: ${result.nixResult.error}${colors.reset}`)
        }

        if (result.denixResult.success) {
            console.log(`${colors.gray}  Denix result: ${JSON.stringify(result.denixResult.value)}${colors.reset}`)
        } else {
            console.log(`${colors.red}  Denix error: ${result.denixResult.error}${colors.reset}`)
        }

        if (!result.passed && result.denixResult.success && result.nixResult.success) {
            console.log(`${colors.yellow}  Values differ!${colors.reset}`)
        }

        console.log()
    }
}

/**
 * Run a test suite
 */
export async function runTestSuite(tests, options = {}) {
    const verbose = options.verbose || false
    const stopOnFail = options.stopOnFail || false

    const results = []
    let passed = 0
    let failed = 0

    console.log(`${colors.blue}Running ${tests.length} translation tests...${colors.reset}\n`)

    for (const test of tests) {
        const result = await testExpression(test.expr, test.description)
        results.push(result)

        if (result.passed) {
            passed++
        } else {
            failed++
        }

        printTestResult(result, verbose)

        if (!result.passed && stopOnFail) {
            console.log(`${colors.red}Stopping on first failure${colors.reset}`)
            break
        }
    }

    console.log(`\n${colors.blue}═══════════════════════════════════════${colors.reset}`)
    console.log(`${colors.green}Passed: ${passed}${colors.reset}`)
    console.log(`${colors.red}Failed: ${failed}${colors.reset}`)
    console.log(`${colors.gray}Total:  ${tests.length}${colors.reset}`)

    const percentage = tests.length > 0 ? ((passed / tests.length) * 100).toFixed(1) : 0
    console.log(`${colors.cyan}Success Rate: ${percentage}%${colors.reset}`)

    return {
        results,
        passed,
        failed,
        total: tests.length,
    }
}

/**
 * Save generated JS code to file
 */
export function saveGeneratedJS(nixExpr, outputPath) {
    const jsCode = convertToJs(nixExpr)
    Deno.writeTextFileSync(outputPath, jsCode)
    return jsCode
}

// If run directly, run some basic tests
if (import.meta.main) {
    const basicTests = [
        { expr: "42", description: "Integer literal" },
        { expr: "42.5", description: "Float literal" },
        { expr: '"hello"', description: "String literal" },
        { expr: "true", description: "Boolean true" },
        { expr: "false", description: "Boolean false" },
        { expr: "null", description: "Null value" },
        { expr: "[1 2 3]", description: "Simple list" },
        { expr: '{ a = 1; b = 2; }', description: "Simple attrset" },
        { expr: "1 + 2", description: "Addition" },
        { expr: "10 - 3", description: "Subtraction" },
        { expr: "4 * 5", description: "Multiplication" },
        { expr: "20 / 4", description: "Division" },
        { expr: 'let x = 5; in x + 10', description: "Let binding" },
        { expr: 'if true then "yes" else "no"', description: "If expression" },
        { expr: 'x: x + 1', description: "Function definition" },
    ]

    await runTestSuite(basicTests, { verbose: true })
}
