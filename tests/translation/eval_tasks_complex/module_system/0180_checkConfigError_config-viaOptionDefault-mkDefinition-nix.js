#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:830
// checkConfigError "A definition for option .viaOptionDefault. is not of type .boolean.*" "config.viaOptionDefault" "./mkDefinition.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .viaOptionDefault. is not of type .boolean.*/,
    attr:    `config.viaOptionDefault`,
    modules: [`./mkDefinition.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.viaOptionDefault @ ./mkDefinition.nix",
})
