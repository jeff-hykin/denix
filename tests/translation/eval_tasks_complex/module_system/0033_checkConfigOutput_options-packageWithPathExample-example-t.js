#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:429
// checkConfigOutput "^\"pkgs\\.hello\"$" "options.packageWithPathExample.example.text" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"pkgs\.hello"$/,
    attr:    `options.packageWithPathExample.example.text`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.packageWithPathExample.example.text @ ./declare-mkPackageOption.nix",
})
