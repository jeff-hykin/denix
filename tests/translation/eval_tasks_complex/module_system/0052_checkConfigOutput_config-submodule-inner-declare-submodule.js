#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:460
// checkConfigOutput "^true$" "config.submodule.inner" "./declare-submodule-via-evalModules.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.submodule.inner`,
    modules: [`./declare-submodule-via-evalModules.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.inner @ ./declare-submodule-via-evalModules.nix",
})
