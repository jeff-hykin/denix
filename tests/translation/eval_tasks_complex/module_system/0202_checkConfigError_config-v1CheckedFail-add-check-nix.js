#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:862
// checkConfigError "A definition for option .* is not of type .signed integer.*" "config.v1CheckedFail" "./add-check.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .* is not of type .signed integer.*/,
    attr:    `config.v1CheckedFail`,
    modules: [`./add-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.v1CheckedFail @ ./add-check.nix",
})
