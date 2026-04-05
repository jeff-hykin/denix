#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:493
// checkConfigOutput "^true$" "config.enable" "./define-option-dependently.nix" "./declare-enable.nix" "./declare-int-positive-value.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.enable`,
    modules: [`./define-option-dependently.nix`, `./declare-enable.nix`, `./declare-int-positive-value.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enable @ ./define-option-dependently.nix",
})
