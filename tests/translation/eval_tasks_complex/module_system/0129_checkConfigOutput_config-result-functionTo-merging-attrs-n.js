#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:661
// checkConfigOutput "^\"a c\"$" "config.result" "./functionTo/merging-attrs.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"a c"$/,
    attr:    `config.result`,
    modules: [`./functionTo/merging-attrs.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./functionTo/merging-attrs.nix",
})
