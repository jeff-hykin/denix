#!/usr/bin/env deno run --allow-read
/**
 * Example runner: translates and displays Nix → JavaScript
 * Usage: deno run --allow-read examples/run_example.js <nix-file>
 */

import { convertToJs } from '../main.js';

const nixFile = Deno.args[0];

if (!nixFile) {
    console.error('Usage: deno run --allow-read examples/run_example.js <nix-file>');
    Deno.exit(1);
}

try {
    const nixCode = await Deno.readTextFile(nixFile);
    const jsCode = convertToJs(nixCode);
    console.log(jsCode);
} catch (error) {
    console.error(`Error: ${error.message}`);
    Deno.exit(1);
}
