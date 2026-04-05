#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:434
// checkConfigOutput "^\"hello\"$" "config.nullablePackageWithDefault.pname" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"hello"$/,
    attr:    `config.nullablePackageWithDefault.pname`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.nullablePackageWithDefault.pname @ ./declare-mkPackageOption.nix",
})
