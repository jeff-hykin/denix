#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:832
// checkConfigOutput "^true$" "config.mkMerge" "./mkDefinition.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.mkMerge`,
    modules: [`./mkDefinition.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.mkMerge @ ./mkDefinition.nix",
})
