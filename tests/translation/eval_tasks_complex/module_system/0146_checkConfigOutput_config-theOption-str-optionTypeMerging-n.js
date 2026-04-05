#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:722
// checkConfigOutput "^\"hello\"$" "config.theOption.str" "./optionTypeMerging.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"hello"$/,
    attr:    `config.theOption.str`,
    modules: [`./optionTypeMerging.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.theOption.str @ ./optionTypeMerging.nix",
})
