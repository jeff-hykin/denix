#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:831
// checkConfigOutput "^true$" "config.viaConfig" "./mkDefinition.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.viaConfig`,
    modules: [`./mkDefinition.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.viaConfig @ ./mkDefinition.nix",
})
