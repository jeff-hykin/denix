#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:864
// checkConfigError "A definition for option .* is not of type .attribute set of signed integer.*" "config.v2checkedFail" "./add-check.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .* is not of type .attribute set of signed integer.*/,
    attr:    `config.v2checkedFail`,
    modules: [`./add-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.v2checkedFail @ ./add-check.nix",
})
