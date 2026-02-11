#!/usr/bin/env -S deno run --allow-all --no-lock
/**
 * Translate all nixpkgs-lib files to JavaScript
 *
 * Translates every .nix file in main/tests/fixtures/nixpkgs-lib/
 * and generates corresponding .js files side-by-side.
 *
 * Usage:
 *   ./run/translate_nixpkgs_lib.js
 *   deno run --allow-all run/translate_nixpkgs_lib.js
 */

import { convertToJs } from "../translator.js"
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"
import { FileSystem, glob } from "https://deno.land/x/quickr@0.8.13/main/file_system.js"

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

const nixpkgsLibDir = `${FileSystem.thisFolder}/../main/tests/fixtures/nixpkgs_lib`

async function translateFile(nixPath) {
    try {
        // Read the Nix file
        const nixCode = await Deno.readTextFile(nixPath)

        // Calculate relative path from output file to runtime.js
        // Output will be in same dir as .nix file
        const jsPath = nixPath.replace(/\.nix$/, ".js")

        // Calculate depth: count path segments from nixpkgs-lib dir
        // e.g., "lib/ascii-table.nix" -> 1 level deep -> "../../../main/runtime.js"
        //       "lib/systems/supported.nix" -> 2 levels -> "../../../../main/runtime.js"
        const relativePath = nixPath.replace(nixpkgsLibDir + "/", "")
        const depth = relativePath.split("/").length - 1
        const upDirs = "../".repeat(depth + 1)  // +1 to get out of fixtures/nixpkgs-lib
        const runtimePath = `${upDirs}../../runtime.js`  // Then navigate to main/runtime.js

        // Translate to JavaScript with correct runtime path
        const jsCode = convertToJs(nixCode, { runtimePath })

        // Generate output path (.nix -> .js) - already done above

        // Write JavaScript file
        await Deno.writeTextFile(jsPath, jsCode)

        return {
            success: true,
            nixPath,
            jsPath,
            nixLines: nixCode.split("\n").length,
            jsLines: jsCode.split("\n").length,
        }
    } catch (error) {
        return {
            success: false,
            nixPath,
            error: error.message,
        }
    }
}

async function main() {
    console.log(`${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`)
    console.log(`${colors.blue}║  Denix: Translate nixpkgs-lib to JavaScript              ║${colors.reset}`)
    console.log(`${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`)

    console.log(`${colors.cyan}Scanning directory:${colors.reset} ${nixpkgsLibDir}\n`)

    // Find all .nix files
    const nixFiles = []
    for await (const entry of walk(nixpkgsLibDir, { exts: [".nix"] })) {
        if (entry.isFile) {
            nixFiles.push(entry.path)
        }
    }

    console.log(`${colors.cyan}Found ${nixFiles.length} Nix files${colors.reset}\n`)

    // Translate each file
    let successCount = 0
    let failCount = 0
    let totalNixLines = 0
    let totalJsLines = 0

    for (const nixPath of nixFiles) {
        const relativePath = nixPath.replace(nixpkgsLibDir + "/", "")
        process.stdout.write(`${colors.gray}Translating:${colors.reset} ${relativePath} ... `)

        const result = await translateFile(nixPath)

        if (result.success) {
            console.log(`${colors.green}✓${colors.reset} ${colors.gray}(${result.nixLines} → ${result.jsLines} lines)${colors.reset}`)
            successCount++
            totalNixLines += result.nixLines
            totalJsLines += result.jsLines
        } else {
            console.log(`${colors.red}✗${colors.reset}`)
            console.log(`${colors.red}  Error: ${result.error}${colors.reset}`)
            failCount++
        }
    }

    // Print summary
    console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`)
    console.log(`${colors.cyan}Translation Summary:${colors.reset}`)
    console.log(`  ${colors.green}✓ Successful:${colors.reset} ${successCount}/${nixFiles.length}`)
    if (failCount > 0) {
        console.log(`  ${colors.red}✗ Failed:${colors.reset}     ${failCount}/${nixFiles.length}`)
    }
    console.log(`  ${colors.gray}Total Lines:${colors.reset}  ${totalNixLines} Nix → ${totalJsLines} JS`)

    const ratio = totalNixLines > 0 ? (totalJsLines / totalNixLines).toFixed(2) : 0
    console.log(`  ${colors.gray}Size Ratio:${colors.reset}   ${ratio}x`)
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`)

    if (successCount === nixFiles.length) {
        console.log(`\n${colors.green}✅ All files translated successfully!${colors.reset}`)
    } else {
        console.log(`\n${colors.yellow}⚠️  ${failCount} file(s) failed to translate${colors.reset}`)
    }

    console.log(`\n${colors.cyan}Output:${colors.reset} JavaScript files written next to original .nix files`)
    console.log(`${colors.gray}Example: lib/ascii-table.nix → lib/ascii-table.js${colors.reset}\n`)
}

if (import.meta.main) {
    await main()
}
