#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:425
// checkConfigOutput "^\"hello\"$" "config.pathPackage.pname" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"hello"$/,
    attr:    `config.pathPackage.pname`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathPackage.pname @ ./declare-mkPackageOption.nix",
})
