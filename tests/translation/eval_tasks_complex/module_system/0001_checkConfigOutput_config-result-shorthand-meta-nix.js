#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:172
// checkConfigOutput "^\"one two\"$" "config.result" "./shorthand-meta.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"one two"$/,
    attr:    `config.result`,
    modules: [`./shorthand-meta.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./shorthand-meta.nix",
})
