#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:450
// checkConfigOutput "^true$" "config.submodule.config" "./declare-submoduleWith-noshorthand.nix" "./define-submoduleWith-noshorthand.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.submodule.config`,
    modules: [`./declare-submoduleWith-noshorthand.nix`, `./define-submoduleWith-noshorthand.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.config @ ./declare-submoduleWith-noshorthand.nix",
})
