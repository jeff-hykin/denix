#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:487
// checkConfigError "The option .* does not exist. Definition values:\\n\\s*- In .*: true" "config.enable" "./disable-recursive/{main.nix,disable-foo.nix,disable-bar.nix}"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .* does not exist. Definition values:\n\s*- In .*: true/,
    attr:    `config.enable`,
    modules: [`./disable-recursive/{main.nix,disable-foo.nix,disable-bar.nix}`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enable @ ./disable-recursive/{main.nix,disable-foo.nix,disable-bar.nix}",
})
