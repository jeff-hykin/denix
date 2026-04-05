#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:580
// checkConfigError "A definition for option .* is not of type .*" "config.value" "./freeform-attrsOf.nix" "./define-value-list.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .* is not of type .*/,
    attr:    `config.value`,
    modules: [`./freeform-attrsOf.nix`, `./define-value-list.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./freeform-attrsOf.nix",
})
