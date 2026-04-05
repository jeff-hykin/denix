#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:721
// checkConfigOutput "^10$" "config.theOption.int" "./optionTypeMerging.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^10$/,
    attr:    `config.theOption.int`,
    modules: [`./optionTypeMerging.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.theOption.int @ ./optionTypeMerging.nix",
})
