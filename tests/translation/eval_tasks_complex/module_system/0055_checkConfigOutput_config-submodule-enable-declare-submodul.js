#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:467
// checkConfigOutput "^true$" "config.submodule.enable" "./declare-submoduleWith-path.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.submodule.enable`,
    modules: [`./declare-submoduleWith-path.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.enable @ ./declare-submoduleWith-path.nix",
})
