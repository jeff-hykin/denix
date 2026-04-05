#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:582
// checkConfigOutput "^\"yes\"$" "config.value" "./freeform-attrsOf.nix" "./define-value-string-properties.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"yes"$/,
    attr:    `config.value`,
    modules: [`./freeform-attrsOf.nix`, `./define-value-string-properties.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./freeform-attrsOf.nix",
})
