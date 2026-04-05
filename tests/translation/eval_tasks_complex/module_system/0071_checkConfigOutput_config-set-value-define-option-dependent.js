#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:498
// checkConfigOutput "^7$" "config.set.value" "./define-option-dependently-nested.nix" "./declare-int-positive-value-nested.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^7$/,
    attr:    `config.set.value`,
    modules: [`./define-option-dependently-nested.nix`, `./declare-int-positive-value-nested.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.set.value @ ./define-option-dependently-nested.nix",
})
