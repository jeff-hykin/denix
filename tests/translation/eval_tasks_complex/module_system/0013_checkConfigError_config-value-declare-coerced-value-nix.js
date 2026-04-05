#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:400
// checkConfigError "The option .value. in .*/declare-coerced-value.nix. is already declared in .*/declare-coerced-value-no-default.nix." "config.value" "./declare-coerced-value.nix" "./declare-coerced-value-no-default.n

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp("The option .value. in .*/declare-coerced-value.nix. is already declared in .*/declare-coerced-value-no-default.nix."),
    attr:    `config.value`,
    modules: [`./declare-coerced-value.nix`, `./declare-coerced-value-no-default.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./declare-coerced-value.nix",
})
