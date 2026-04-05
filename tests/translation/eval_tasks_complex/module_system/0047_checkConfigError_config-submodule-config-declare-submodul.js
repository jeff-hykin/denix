#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:449
// checkConfigError "In module ..*define-submoduleWith-shorthand.nix., you're trying to define a value of type `bool'\\n\\s*rather than an attribute set for the option" "config.submodule.config" "./declare-submoduleWith-

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /In module ..*define-submoduleWith-shorthand.nix., you're trying to define a value of type `bool'\n\s*rather than an attribute set for the option/,
    attr:    `config.submodule.config`,
    modules: [`./declare-submoduleWith-noshorthand.nix`, `./define-submoduleWith-shorthand.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.config @ ./declare-submoduleWith-noshorthand.nix",
})
