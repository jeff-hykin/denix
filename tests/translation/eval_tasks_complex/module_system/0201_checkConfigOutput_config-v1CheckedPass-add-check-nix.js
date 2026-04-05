#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:861
// checkConfigOutput "^0$" "config.v1CheckedPass" "./add-check.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^0$/,
    attr:    `config.v1CheckedPass`,
    modules: [`./add-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.v1CheckedPass @ ./add-check.nix",
})
