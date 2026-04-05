#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:413
// checkConfigOutput "^false$" "config.enable" "./alias-with-priority-can-override.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^false$/,
    attr:    `config.enable`,
    modules: [`./alias-with-priority-can-override.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enable @ ./alias-with-priority-can-override.nix",
})
