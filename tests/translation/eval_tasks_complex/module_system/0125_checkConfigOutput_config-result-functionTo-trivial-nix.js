#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:657
// checkConfigOutput "^\"input is input\"$" "config.result" "./functionTo/trivial.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"input is input"$/,
    attr:    `config.result`,
    modules: [`./functionTo/trivial.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./functionTo/trivial.nix",
})
