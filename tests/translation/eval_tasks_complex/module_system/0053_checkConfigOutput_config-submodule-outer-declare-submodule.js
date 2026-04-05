#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:461
// checkConfigOutput "^true$" "config.submodule.outer" "./declare-submodule-via-evalModules.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.submodule.outer`,
    modules: [`./declare-submodule-via-evalModules.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.outer @ ./declare-submodule-via-evalModules.nix",
})
