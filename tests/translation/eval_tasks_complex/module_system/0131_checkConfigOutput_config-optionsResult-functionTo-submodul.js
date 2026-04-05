#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:663
// checkConfigOutput "^\"fun.<function body>.a fun.<function body>.b\"$" "config.optionsResult" "./functionTo/submodule-options.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"fun.<function body>.a fun.<function body>.b"$/,
    attr:    `config.optionsResult`,
    modules: [`./functionTo/submodule-options.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.optionsResult @ ./functionTo/submodule-options.nix",
})
