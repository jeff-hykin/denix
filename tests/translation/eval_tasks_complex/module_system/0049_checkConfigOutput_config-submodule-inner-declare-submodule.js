#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:453
// checkConfigOutput "^true$" "config.submodule.inner" "./declare-submoduleWith-modules.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.submodule.inner`,
    modules: [`./declare-submoduleWith-modules.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.inner @ ./declare-submoduleWith-modules.nix",
})
