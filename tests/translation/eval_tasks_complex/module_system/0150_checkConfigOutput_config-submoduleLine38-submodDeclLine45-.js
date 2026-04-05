#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:782
// checkConfigOutput "/declaration-positions.nix\"$" "config.submoduleLine38.submodDeclLine45.0.file" "./declaration-positions.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("/declaration-positions.nix\"$"),
    attr:    `config.submoduleLine38.submodDeclLine45.0.file`,
    modules: [`./declaration-positions.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submoduleLine38.submodDeclLine45.0.file @ ./declaration-positions.nix",
})
