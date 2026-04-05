#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:490
// checkConfigOutput "^true$" "config.enable" "./import-from-store.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.enable`,
    modules: [`./import-from-store.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enable @ ./import-from-store.nix",
})
