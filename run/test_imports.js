#!/usr/bin/env -S deno run --allow-all
/**
 * Test that generated JavaScript modules can be imported
 *
 * This verifies that the translator's export functionality works correctly.
 */

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

async function testImport(modulePath, description) {
    try {
        process.stdout.write(`${colors.gray}Testing:${colors.reset} ${description} ... `)

        // Import the module
        const module = await import(modulePath)

        // Check if default export exists
        if (module.default === undefined) {
            console.log(`${colors.red}✗ No default export${colors.reset}`)
            return false
        }

        console.log(`${colors.green}✓${colors.reset} ${colors.gray}(type: ${typeof module.default})${colors.reset}`)
        return true
    } catch (error) {
        console.log(`${colors.red}✗ ${error.message}${colors.reset}`)
        return false
    }
}

async function main() {
    console.log(`${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
    console.log(`${colors.blue}║  Testing Generated JavaScript Module Imports             ║${colors.reset}`)
    console.log(`${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`)

    const tests = [
        {
            path: "../main/tests/fixtures/nixpkgs_lib/ascii-table.js",
            description: "ascii-table.js (simple object)"
        },
        {
            path: "../main/tests/fixtures/nixpkgs_lib/flakes.js",
            description: "flakes.js (function)"
        },
        {
            path: "../main/tests/fixtures/nixpkgs_lib/minver.js",
            description: "minver.js (object with functions)"
        },
    ]

    let passed = 0
    let failed = 0

    for (const test of tests) {
        const success = await testImport(test.path, test.description)
        if (success) {
            passed++
        } else {
            failed++
        }
    }

    console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`)
    if (failed === 0) {
        console.log(`${colors.green}✅ All imports successful! (${passed}/${tests.length})${colors.reset}`)
    } else {
        console.log(`${colors.yellow}⚠️  ${failed}/${tests.length} imports failed${colors.reset}`)
    }
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`)

    // Example: Actually use an import
    if (passed > 0) {
        console.log(`${colors.cyan}Example Usage:${colors.reset}`)
        console.log(`${colors.gray}$ deno repl --allow-all${colors.reset}`)
        console.log(`${colors.gray}> import asciiTable from "./main/tests/fixtures/nixpkgs_lib/ascii-table.js"${colors.reset}`)
        console.log(`${colors.gray}> asciiTable["A"]  // Returns: 65n${colors.reset}\n`)
    }
}

if (import.meta.main) {
    await main()
}
