#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:497
// checkConfigOutput "^360$" "config.set.value" "./define-option-dependently-nested.nix" "./declare-enable-nested.nix" "./declare-int-positive-value-nested.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^360$/,
    attr:    `config.set.value`,
    modules: [`./define-option-dependently-nested.nix`, `./declare-enable-nested.nix`, `./declare-int-positive-value-nested.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.set.value @ ./define-option-dependently-nested.nix",
})
