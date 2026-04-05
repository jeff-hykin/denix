#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:486
// checkConfigOutput "^true$" "config.enable" "./disable-recursive/{main.nix,disable-bar.nix}"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.enable`,
    modules: [`./disable-recursive/{main.nix,disable-bar.nix}`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enable @ ./disable-recursive/{main.nix,disable-bar.nix}",
})
