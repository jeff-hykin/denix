#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:433
// checkConfigOutput "^\"null or package\"$" "options.nullablePackage.type.description" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"null or package"$/,
    attr:    `options.nullablePackage.type.description`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.nullablePackage.type.description @ ./declare-mkPackageOption.nix",
})
