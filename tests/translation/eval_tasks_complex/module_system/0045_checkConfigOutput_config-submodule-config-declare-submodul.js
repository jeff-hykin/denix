#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:447
// checkConfigOutput "^true$" "config.submodule.config" "./declare-submoduleWith-shorthand.nix" "./define-submoduleWith-shorthand.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.submodule.config`,
    modules: [`./declare-submoduleWith-shorthand.nix`, `./define-submoduleWith-shorthand.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.config @ ./declare-submoduleWith-shorthand.nix",
})
