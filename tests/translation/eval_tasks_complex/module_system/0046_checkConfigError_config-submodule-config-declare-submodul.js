#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:448
// checkConfigError "is not of type `boolean" "config.submodule.config" "./declare-submoduleWith-shorthand.nix" "./define-submoduleWith-noshorthand.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /is not of type `boolean/,
    attr:    `config.submodule.config`,
    modules: [`./declare-submoduleWith-shorthand.nix`, `./define-submoduleWith-noshorthand.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.config @ ./declare-submoduleWith-shorthand.nix",
})
