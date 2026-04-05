#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:658
// checkConfigOutput "^\"a b\"$" "config.result" "./functionTo/merging-list.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"a b"$/,
    attr:    `config.result`,
    modules: [`./functionTo/merging-list.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./functionTo/merging-list.nix",
})
