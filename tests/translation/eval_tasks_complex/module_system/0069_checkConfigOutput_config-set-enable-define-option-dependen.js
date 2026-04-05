#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:496
// checkConfigOutput "^true$" "config.set.enable" "./define-option-dependently-nested.nix" "./declare-enable-nested.nix" "./declare-int-positive-value-nested.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.set.enable`,
    modules: [`./define-option-dependently-nested.nix`, `./declare-enable-nested.nix`, `./declare-int-positive-value-nested.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.set.enable @ ./define-option-dependently-nested.nix",
})
