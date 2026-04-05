#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:863
// checkConfigOutput "^true$" "config.v2checkedPass" "./add-check.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.v2checkedPass`,
    modules: [`./add-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.v2checkedPass @ ./add-check.nix",
})
