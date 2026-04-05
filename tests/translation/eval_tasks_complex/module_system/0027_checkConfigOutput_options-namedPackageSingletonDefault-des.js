#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:423
// checkConfigOutput "^\".*Hello.*\"$" "options.namedPackageSingletonDefault.description" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^".*Hello.*"$/,
    attr:    `options.namedPackageSingletonDefault.description`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.namedPackageSingletonDefault.description @ ./declare-mkPackageOption.nix",
})
