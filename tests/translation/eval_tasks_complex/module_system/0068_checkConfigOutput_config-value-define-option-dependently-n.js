#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:495
// checkConfigOutput "^7$" "config.value" "./define-option-dependently.nix" "./declare-int-positive-value.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^7$/,
    attr:    `config.value`,
    modules: [`./define-option-dependently.nix`, `./declare-int-positive-value.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./define-option-dependently.nix",
})
