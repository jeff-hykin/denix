#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:662
// checkConfigOutput "^\"a bee\"$" "config.result" "./functionTo/submodule-options.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"a bee"$/,
    attr:    `config.result`,
    modules: [`./functionTo/submodule-options.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./functionTo/submodule-options.nix",
})
