#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:396
// checkConfigOutput "^\"24\"$" "config.value" "./declare-coerced-value.nix" "./define-value-string.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"24"$/,
    attr:    `config.value`,
    modules: [`./declare-coerced-value.nix`, `./define-value-string.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./declare-coerced-value.nix",
})
