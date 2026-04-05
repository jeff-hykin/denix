#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:506
// checkConfigOutput "^false$" "config.conditionalWorks" "./declare-lazyAttrsOf.nix" "./attrsOf-conditional-check.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^false$/,
    attr:    `config.conditionalWorks`,
    modules: [`./declare-lazyAttrsOf.nix`, `./attrsOf-conditional-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conditionalWorks @ ./declare-lazyAttrsOf.nix",
})
