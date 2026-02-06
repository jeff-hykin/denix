#!/usr/bin/env deno run --allow-read
/**
 * Automated verification script for examples
 * Checks that all .nix files have corresponding .js files
 * and that the generated output matches expectations
 */

import { convertToJs } from '../main.js';

// ANSI colors for output
const green = (text) => `\x1b[32m${text}\x1b[0m`;
const red = (text) => `\x1b[31m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;
const blue = (text) => `\x1b[34m${text}\x1b[0m`;

async function findNixFiles(dir) {
    const nixFiles = [];

    for await (const entry of Deno.readDir(dir)) {
        const fullPath = `${dir}/${entry.name}`;

        if (entry.isDirectory) {
            // Recursively search subdirectories
            nixFiles.push(...await findNixFiles(fullPath));
        } else if (entry.isFile && entry.name.endsWith('.nix')) {
            nixFiles.push(fullPath);
        }
    }

    return nixFiles;
}

function normalizeJs(code) {
    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    code = code.replace(/\/\/.*/g, '');

    // Remove extra whitespace
    code = code.replace(/\s+/g, ' ');

    // Trim
    return code.trim();
}

async function verifyExample(nixFile) {
    const jsFile = nixFile.replace('.nix', '.js');
    const rawJsFile = nixFile.replace('.nix', '.raw.js');

    // Check if .js file exists
    try {
        await Deno.stat(jsFile);
    } catch {
        return {
            file: nixFile,
            status: 'missing',
            message: `No corresponding ${jsFile} found`
        };
    }

    // Read and translate the .nix file
    let nixCode, translatedCode;
    try {
        nixCode = await Deno.readTextFile(nixFile);
        translatedCode = convertToJs(nixCode);
    } catch (error) {
        return {
            file: nixFile,
            status: 'error',
            message: `Translation failed: ${error.message}`
        };
    }

    // Check if raw file exists for comparison
    let hasRawFile = false;
    try {
        await Deno.stat(rawJsFile);
        hasRawFile = true;
    } catch {
        // No raw file - this is okay, we'll skip detailed comparison
    }

    if (hasRawFile) {
        // Compare with raw file
        try {
            const rawCode = await Deno.readTextFile(rawJsFile);
            const normalizedTranslated = normalizeJs(translatedCode);
            const normalizedRaw = normalizeJs(rawCode);

            if (normalizedTranslated === normalizedRaw) {
                return {
                    file: nixFile,
                    status: 'verified',
                    message: 'Output matches raw file'
                };
            } else {
                return {
                    file: nixFile,
                    status: 'mismatch',
                    message: 'Generated output differs from raw file',
                    expected: normalizedRaw.slice(0, 100),
                    got: normalizedTranslated.slice(0, 100)
                };
            }
        } catch (error) {
            return {
                file: nixFile,
                status: 'error',
                message: `Comparison failed: ${error.message}`
            };
        }
    }

    // No raw file - just verify translation works
    return {
        file: nixFile,
        status: 'ok',
        message: 'Translation successful (no verification file)'
    };
}

async function main() {
    console.log(blue('Denix Examples Verification\n'));

    const examplesDir = new URL('.', import.meta.url).pathname.replace(/\/$/, '');
    const nixFiles = await findNixFiles(examplesDir);

    if (nixFiles.length === 0) {
        console.log(yellow('No .nix files found in examples/'));
        return;
    }

    console.log(`Found ${nixFiles.length} .nix files to verify\n`);

    const results = [];
    for (const nixFile of nixFiles.sort()) {
        const relativePath = nixFile.replace(examplesDir + '/', '');
        process.stdout.write(`Verifying ${relativePath}... `);

        const result = await verifyExample(nixFile);
        results.push(result);

        if (result.status === 'verified' || result.status === 'ok') {
            console.log(green('✓'));
        } else if (result.status === 'missing') {
            console.log(yellow('⚠'));
        } else {
            console.log(red('✗'));
        }
    }

    // Print summary
    console.log('\n' + blue('Summary:'));

    const verified = results.filter(r => r.status === 'verified');
    const ok = results.filter(r => r.status === 'ok');
    const missing = results.filter(r => r.status === 'missing');
    const errors = results.filter(r => r.status === 'error');
    const mismatches = results.filter(r => r.status === 'mismatch');

    console.log(green(`  ✓ ${verified.length} verified (matched raw output)`));
    console.log(green(`  ✓ ${ok.length} ok (translation successful)`));

    if (missing.length > 0) {
        console.log(yellow(`  ⚠ ${missing.length} missing .js files`));
        missing.forEach(r => console.log(yellow(`    - ${r.file}`)));
    }

    if (errors.length > 0) {
        console.log(red(`  ✗ ${errors.length} errors`));
        errors.forEach(r => console.log(red(`    - ${r.file}: ${r.message}`)));
    }

    if (mismatches.length > 0) {
        console.log(red(`  ✗ ${mismatches.length} mismatches`));
        mismatches.forEach(r => {
            console.log(red(`    - ${r.file}`));
            if (r.expected && r.got) {
                console.log(`      Expected: ${r.expected.slice(0, 60)}...`);
                console.log(`      Got:      ${r.got.slice(0, 60)}...`);
            }
        });
    }

    const totalSuccess = verified.length + ok.length;
    const totalFailed = missing.length + errors.length + mismatches.length;

    console.log(`\n${totalSuccess}/${results.length} examples verified`);

    if (totalFailed > 0) {
        Deno.exit(1);
    }
}

main();
