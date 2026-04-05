#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:427
// checkConfigOutput "^\"pkgs\\.hello\\.override \\{ stdenv = pkgs\\.clangStdenv; \\}\"$" "options.packageWithExample.example.text" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"pkgs\.hello\.override \{ stdenv = pkgs\.clangStdenv; \}"$/,
    attr:    `options.packageWithExample.example.text`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.packageWithExample.example.text @ ./declare-mkPackageOption.nix",
})
