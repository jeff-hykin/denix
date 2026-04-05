#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:494
// checkConfigOutput "^360$" "config.value" "./define-option-dependently.nix" "./declare-enable.nix" "./declare-int-positive-value.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^360$/,
    attr:    `config.value`,
    modules: [`./define-option-dependently.nix`, `./declare-enable.nix`, `./declare-int-positive-value.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./define-option-dependently.nix",
})
