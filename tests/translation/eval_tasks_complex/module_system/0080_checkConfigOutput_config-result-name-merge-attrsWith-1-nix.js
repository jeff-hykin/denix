#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:515
// checkConfigOutput "^\"mergedName.<id>.nested\"$" "config.result" "./name-merge-attrsWith-1.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"mergedName.<id>.nested"$/,
    attr:    `config.result`,
    modules: [`./name-merge-attrsWith-1.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./name-merge-attrsWith-1.nix",
})
