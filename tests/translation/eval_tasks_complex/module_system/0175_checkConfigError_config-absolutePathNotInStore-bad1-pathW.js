#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:818
// checkConfigError "A definition for option .absolutePathNotInStore.bad1. is not of type .absolute path not in the Nix store." "config.absolutePathNotInStore.bad1" "./pathWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .absolutePathNotInStore.bad1. is not of type .absolute path not in the Nix store./,
    attr:    `config.absolutePathNotInStore.bad1`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.absolutePathNotInStore.bad1 @ ./pathWith.nix",
})
