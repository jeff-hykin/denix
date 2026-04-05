#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:676
// checkConfigError "The option .int.a. was accessed but has no value defined. Try setting the option." "config.int.a" "./emptyValues.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .int.a. was accessed but has no value defined. Try setting the option./,
    attr:    `config.int.a`,
    modules: [`./emptyValues.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.int.a @ ./emptyValues.nix",
})
