#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:677
// checkConfigError "The option .nonEmptyList.a. was accessed but has no value defined. Try setting the option." "config.nonEmptyList.a" "./emptyValues.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .nonEmptyList.a. was accessed but has no value defined. Try setting the option./,
    attr:    `config.nonEmptyList.a`,
    modules: [`./emptyValues.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.nonEmptyList.a @ ./emptyValues.nix",
})
