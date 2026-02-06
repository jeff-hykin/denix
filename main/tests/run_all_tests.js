#!/usr/bin/env -S deno run --allow-all
// Master test runner - executes all tests in the test suite

import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { run, Stdout, Stderr, returnAsString } from "https://deno.land/x/quickr@0.6.51/main/run.js"

const testRoot = FileSystem.makeAbsolutePath("./")
const results = {
    total: 0,
    passed: 0,
    failed: 0,
    errors: 0,
    suites: []
}

console.log("=" system".repeat(80))
console.log("DENIX TEST SUITE - Running All Tests")
console.log("=".repeat(80))
console.log()

// Find all test files recursively
async function findTestFiles(dir) {
    const testFiles = []
    for await (const entry of FileSystem.recursivelyIterateItemsIn(dir, { searchOrder: 'breadthFirstSearch', shouldntExplore: (item) => item.basename === 'node_modules' || item.basename === '.git' })) {
        if (entry.isFile && entry.path.endsWith('.js') && !entry.path.includes('test_harness') && !entry.path.includes('run_all_tests')) {
            testFiles.push(entry.path)
        }
    }
    return testFiles.sort()
}

// Run a single test file
async function runTest(testFile) {
    const relativePath = testFile.replace(testRoot + '/', '')
    try {
        const output = await run`deno run --allow-all ${testFile} ${Stdout(returnAsString)} ${Stderr(returnAsString)}`

        // Parse results from output
        const lines = output.split('\n')
        const summaryLine = lines.find(line => line.includes('passed') && line.includes('failed'))

        if (summaryLine) {
            const passedMatch = summaryLine.match(/(\d+) passed/)
            const failedMatch = summaryLine.match(/(\d+) failed/)

            const passed = passedMatch ? parseInt(passedMatch[1]) : 0
            const failed = failedMatch ? parseInt(failedMatch[1]) : 0

            results.total += (passed + failed)
            results.passed += passed
            results.failed += failed

            const status = failed > 0 ? '✗' : '✓'
            const color = failed > 0 ? '\x1b[31m' : '\x1b[32m'
            const reset = '\x1b[0m'

            console.log(`${color}${status}${reset} ${relativePath}: ${passed} passed, ${failed} failed`)

            results.suites.push({
                file: relativePath,
                passed,
                failed,
                success: failed === 0
            })

            return failed === 0
        } else {
            console.log(`⚠ ${relativePath}: Could not parse results`)
            results.errors++
            return false
        }
    } catch (error) {
        console.log(`\x1b[31m✗\x1b[0m ${relativePath}: ERROR - ${error.message}`)
        results.errors++
        results.suites.push({
            file: relativePath,
            passed: 0,
            failed: 0,
            error: error.message,
            success: false
        })
        return false
    }
}

// Group tests by category
async function categorizeAndRunTests() {
    const testFiles = await findTestFiles(testRoot)

    const categories = {
        'Builtins - Easy': [],
        'Builtins - Medium': [],
        'Builtins - Hard': [],
        'Operators': [],
        'Other': []
    }

    // Categorize files
    for (const file of testFiles) {
        const relativePath = file.replace(testRoot + '/', '')

        if (relativePath.includes('operators/')) {
            categories['Operators'].push(file)
        } else if (relativePath.includes('builtins/')) {
            // Categorize builtins based on complexity
            if (relativePath.match(/\/(concatMap|mapAttrs|removeAttrs|listToAttrs|intersectAttrs|seq|deepSeq|tryEval|trace|throw)\//)) {
                categories['Builtins - Easy'].push(file)
            } else if (relativePath.match(/\/(groupBy|sort|split|toXML|baseNameOf|dirOf|attrNames|catAttrs|zipAttrsWith|readDir|readFileType)\//)) {
                categories['Builtins - Medium'].push(file)
            } else {
                categories['Builtins - Hard'].push(file)
            }
        } else {
            categories['Other'].push(file)
        }
    }

    // Run tests by category
    for (const [category, files] of Object.entries(categories)) {
        if (files.length === 0) continue

        console.log()
        console.log(`\x1b[1m\x1b[34m### ${category} (${files.length} test suites)\x1b[0m`)
        console.log()

        for (const file of files) {
            await runTest(file)
        }
    }
}

// Run all tests
await categorizeAndRunTests()

// Print final summary
console.log()
console.log("=".repeat(80))
console.log("FINAL SUMMARY")
console.log("=".repeat(80))
console.log(`Total test suites: ${results.suites.length}`)
console.log(`Total tests: ${results.total}`)
console.log(`\x1b[32m✓ Passed: ${results.passed}\x1b[0m`)
console.log(`\x1b[31m✗ Failed: ${results.failed}\x1b[0m`)
if (results.errors > 0) {
    console.log(`\x1b[33m⚠ Errors: ${results.errors}\x1b[0m`)
}
console.log("=".repeat(80))

// Show failed suites if any
if (results.failed > 0 || results.errors > 0) {
    console.log()
    console.log("\x1b[31mFailed test suites:\x1b[0m")
    for (const suite of results.suites) {
        if (!suite.success) {
            console.log(`  - ${suite.file}${suite.error ? ` (${suite.error})` : ''}`)
        }
    }
}

// Exit with error code if any tests failed
if (results.failed > 0 || results.errors > 0) {
    Deno.exit(1)
}

console.log()
console.log("\x1b[32m\x1b[1m✓ All tests passed!\x1b[0m")
