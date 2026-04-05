#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:437
// checkConfigOutput "^\"hello\"$" "config.packageInvalidIdentifier.pname" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"hello"$/,
    attr:    `config.packageInvalidIdentifier.pname`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.packageInvalidIdentifier.pname @ ./declare-mkPackageOption.nix",
})
