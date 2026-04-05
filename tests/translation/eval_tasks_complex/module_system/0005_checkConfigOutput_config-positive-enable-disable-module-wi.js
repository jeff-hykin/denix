#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:369
// checkConfigOutput "^true$" "config.positive.enable" "./disable-module-with-key.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.positive.enable`,
    modules: [`./disable-module-with-key.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.positive.enable @ ./disable-module-with-key.nix",
})
