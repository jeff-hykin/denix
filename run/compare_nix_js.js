#!/usr/bin/env -S deno run --allow-all
/**
 * Compare Nix vs JavaScript Evaluation
 *
 * For each .nix file in nixpkgs_lib:
 * 1. Import the corresponding .js module
 * 2. Evaluate the .nix file with Nix CLI
 * 3. Compare the results
 * 4. Report per-file and summary statistics
 */

import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"
import { relative } from "https://deno.land/std@0.224.0/path/mod.ts"

// ANSI colors
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    gray: "\x1b[90m",
    magenta: "\x1b[35m",
}

const nixpkgsLibDir = "/Users/jeffhykin/repos/denix/main/tests/fixtures/nixpkgs_lib"

/**
 * Evaluate a Nix file using the Nix CLI
 */
async function evaluateWithNix(nixPath) {
    try {
        const cmd = new Deno.Command("nix", {
            args: [
                "eval",
                "--expr",
                `import ${nixPath}`,
                "--json",
                "--impure",
            ],
            stdout: "piped",
            stderr: "piped",
        })

        const result = await cmd.output()

        if (result.code !== 0) {
            const stderr = new TextDecoder().decode(result.stderr)
            return {
                success: false,
                error: stderr.split('\n').slice(-3).join('\n'), // Last 3 lines
            }
        }

        const stdout = new TextDecoder().decode(result.stdout)
        return {
            success: true,
            value: JSON.parse(stdout),
        }
    } catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

/**
 * Import and evaluate a JavaScript module
 */
async function evaluateWithJs(jsPath) {
    try {
        // Dynamic import with timestamp to bypass cache
        const module = await import(`${jsPath}?t=${Date.now()}`)

        // Get the default export
        let result = module.default

        // If it's a promise, await it
        if (result instanceof Promise) {
            result = await result
        }

        return {
            success: true,
            value: result,
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
    // Handle BigInt comparison
    if (typeof a === 'bigint' && typeof b === 'number') {
        return a === BigInt(b)
    }
    if (typeof a === 'number' && typeof b === 'bigint') {
        return BigInt(a) === b
    }

    if (a === b) return true
    if (a == null || b == null) return false
    if (typeof a !== typeof b) return false

    if (typeof a === 'object') {
        if (Array.isArray(a) !== Array.isArray(b)) return false

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
 * Serialize value for display (handles BigInt and special types)
 */
function serializeValue(value, maxLength = 200) {
    try {
        // Handle BigInt
        const json = JSON.stringify(value, (key, val) =>
            typeof val === 'bigint' ? val.toString() : val
        )
        if (json.length <= maxLength) {
            return json
        }
        return json.substring(0, maxLength) + "..."
    } catch {
        const str = String(value)
        if (str.length <= maxLength) {
            return str
        }
        return str.substring(0, maxLength) + "..."
    }
}

/**
 * Compare a single Nix file with its JavaScript equivalent
 */
async function compareFile(nixPath) {
    const jsPath = nixPath.replace(/\.nix$/, ".js")
    const relativePath = relative(nixpkgsLibDir, nixPath)

    // Check if JS file exists
    try {
        await Deno.stat(jsPath)
    } catch {
        return {
            relativePath,
            status: 'skip',
            reason: 'No .js file',
        }
    }

    // Evaluate with Nix
    const nixResult = await evaluateWithNix(nixPath)

    // Evaluate with JS
    const jsResult = await evaluateWithJs(jsPath)

    // Compare results
    if (!nixResult.success && !jsResult.success) {
        return {
            relativePath,
            status: 'both-fail',
            nixError: nixResult.error,
            jsError: jsResult.error,
        }
    }

    if (!nixResult.success) {
        return {
            relativePath,
            status: 'nix-fail',
            error: nixResult.error,
            jsValue: serializeValue(jsResult.value),
        }
    }

    if (!jsResult.success) {
        return {
            relativePath,
            status: 'js-fail',
            nixValue: serializeValue(nixResult.value),
            error: jsResult.error,
        }
    }

    // Both succeeded, compare values
    const match = deepEqual(nixResult.value, jsResult.value)

    return {
        relativePath,
        status: match ? 'match' : 'mismatch',
        nixValue: serializeValue(nixResult.value),
        jsValue: serializeValue(jsResult.value),
    }
}

/**
 * Print a single result
 */
function printResult(result) {
    const path = result.relativePath.padEnd(50)

    switch (result.status) {
        case 'match':
            console.log(`${colors.green}✓ MATCH${colors.reset}    ${colors.gray}${path}${colors.reset}`)
            break

        case 'mismatch':
            console.log(`${colors.red}✗ DIFFER${colors.reset}   ${colors.gray}${path}${colors.reset}`)
            console.log(`  ${colors.cyan}Nix:${colors.reset} ${result.nixValue}`)
            console.log(`  ${colors.magenta}JS: ${colors.reset} ${result.jsValue}`)
            break

        case 'nix-fail':
            console.log(`${colors.yellow}⚠ NIX ERR${colors.reset}  ${colors.gray}${path}${colors.reset}`)
            console.log(`  ${colors.red}${result.error}${colors.reset}`)
            break

        case 'js-fail':
            console.log(`${colors.yellow}⚠ JS ERR${colors.reset}   ${colors.gray}${path}${colors.reset}`)
            console.log(`  ${colors.red}${result.error}${colors.reset}`)
            break

        case 'both-fail':
            console.log(`${colors.gray}○ BOTH ERR${colors.reset} ${colors.gray}${path}${colors.reset}`)
            break

        case 'skip':
            console.log(`${colors.gray}○ SKIP${colors.reset}     ${colors.gray}${path}${colors.reset} ${colors.gray}(${result.reason})${colors.reset}`)
            break
    }
}

async function main() {
    console.log(`${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
    console.log(`${colors.blue}║  Comparing Nix vs JavaScript Evaluation                  ║${colors.reset}`)
    console.log(`${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`)

    console.log(`${colors.cyan}Directory:${colors.reset} ${nixpkgsLibDir}\n`)

    // Find all .nix files
    const nixFiles = []
    for await (const entry of walk(nixpkgsLibDir, { exts: [".nix"] })) {
        if (entry.isFile) {
            nixFiles.push(entry.path)
        }
    }

    console.log(`${colors.cyan}Found ${nixFiles.length} .nix files${colors.reset}\n`)
    console.log(`${colors.gray}Comparing each file...${colors.reset}\n`)

    // Compare each file
    const results = []
    for (const nixPath of nixFiles.sort()) {
        const result = await compareFile(nixPath)
        results.push(result)
        printResult(result)
    }

    // Calculate statistics
    const stats = {
        total: results.length,
        match: results.filter(r => r.status === 'match').length,
        mismatch: results.filter(r => r.status === 'mismatch').length,
        nixFail: results.filter(r => r.status === 'nix-fail').length,
        jsFail: results.filter(r => r.status === 'js-fail').length,
        bothFail: results.filter(r => r.status === 'both-fail').length,
        skip: results.filter(r => r.status === 'skip').length,
    }

    const evaluated = stats.total - stats.skip
    const successful = stats.match
    const successRate = evaluated > 0 ? (successful / evaluated * 100).toFixed(1) : 0

    // Print summary
    console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`)
    console.log(`${colors.cyan}Summary:${colors.reset}`)
    console.log(`  ${colors.green}✓ Match:${colors.reset}       ${stats.match}/${evaluated} ${colors.gray}(${successRate}%)${colors.reset}`)
    console.log(`  ${colors.red}✗ Mismatch:${colors.reset}    ${stats.mismatch}`)
    console.log(`  ${colors.yellow}⚠ Nix Error:${colors.reset}   ${stats.nixFail}`)
    console.log(`  ${colors.yellow}⚠ JS Error:${colors.reset}    ${stats.jsFail}`)
    console.log(`  ${colors.gray}○ Both Error:${colors.reset}  ${stats.bothFail}`)
    console.log(`  ${colors.gray}○ Skipped:${colors.reset}     ${stats.skip}`)
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`)

    if (successRate >= 90) {
        console.log(`\n${colors.green}✅ Excellent! ${successRate}% success rate${colors.reset}`)
    } else if (successRate >= 70) {
        console.log(`\n${colors.yellow}⚠️  Good progress: ${successRate}% success rate${colors.reset}`)
    } else {
        console.log(`\n${colors.red}❌ Needs work: ${successRate}% success rate${colors.reset}`)
    }

    // List files with mismatches if any
    if (stats.mismatch > 0) {
        console.log(`\n${colors.cyan}Files with mismatches:${colors.reset}`)
        results
            .filter(r => r.status === 'mismatch')
            .forEach(r => console.log(`  ${colors.gray}- ${r.relativePath}${colors.reset}`))
    }

    // List files with JS errors if any
    if (stats.jsFail > 0) {
        console.log(`\n${colors.cyan}Files with JS errors:${colors.reset}`)
        results
            .filter(r => r.status === 'js-fail')
            .forEach(r => console.log(`  ${colors.gray}- ${r.relativePath}${colors.reset}`))
    }

    console.log()
}

if (import.meta.main) {
    await main()
}
