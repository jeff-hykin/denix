#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:411
// checkConfigOutput "^true$" "config.enable" "./alias-with-priority.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.enable`,
    modules: [`./alias-with-priority.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enable @ ./alias-with-priority.nix",
})
