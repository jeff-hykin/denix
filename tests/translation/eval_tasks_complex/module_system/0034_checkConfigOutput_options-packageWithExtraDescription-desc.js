#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:430
// checkConfigOutput "^\".*Example extra description\\..*\"$" "options.packageWithExtraDescription.description" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^".*Example extra description\..*"$/,
    attr:    `options.packageWithExtraDescription.description`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.packageWithExtraDescription.description @ ./declare-mkPackageOption.nix",
})
