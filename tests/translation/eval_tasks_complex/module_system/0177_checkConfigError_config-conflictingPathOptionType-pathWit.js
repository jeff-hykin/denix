#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:822
// checkConfigError "The option .conflictingPathOptionType. in .*/pathWith.nix. is already declared in .*/pathWith.nix" "config.conflictingPathOptionType" "./pathWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp("The option .conflictingPathOptionType. in .*/pathWith.nix. is already declared in .*/pathWith.nix"),
    attr:    `config.conflictingPathOptionType`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conflictingPathOptionType @ ./pathWith.nix",
})
