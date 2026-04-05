#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:464
// checkConfigOutput "^\"submodule\"$" "options.submodule.type.description" "./declare-submodule-via-evalModules.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"submodule"$/,
    attr:    `options.submodule.type.description`,
    modules: [`./declare-submodule-via-evalModules.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.submodule.type.description @ ./declare-submodule-via-evalModules.nix",
})
