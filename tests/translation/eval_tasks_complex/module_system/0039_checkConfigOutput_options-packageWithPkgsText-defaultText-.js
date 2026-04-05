#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:435
// checkConfigOutput "^\"myPkgs\\.hello\"$" "options.packageWithPkgsText.defaultText.text" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"myPkgs\.hello"$/,
    attr:    `options.packageWithPkgsText.defaultText.text`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.packageWithPkgsText.defaultText.text @ ./declare-mkPackageOption.nix",
})
