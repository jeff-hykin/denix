#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:505
// checkConfigOutput "^true$" "config.conditionalWorks" "./declare-attrsOf.nix" "./attrsOf-conditional-check.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.conditionalWorks`,
    modules: [`./declare-attrsOf.nix`, `./attrsOf-conditional-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conditionalWorks @ ./declare-attrsOf.nix",
})
