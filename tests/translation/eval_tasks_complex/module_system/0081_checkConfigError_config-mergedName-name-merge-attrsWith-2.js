#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:516
// checkConfigError "The option .mergedName. in .*\\.nix. is already declared in .*\\.nix" "config.mergedName" "./name-merge-attrsWith-2.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .mergedName. in .*\.nix. is already declared in .*\.nix/,
    attr:    `config.mergedName`,
    modules: [`./name-merge-attrsWith-2.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.mergedName @ ./name-merge-attrsWith-2.nix",
})
