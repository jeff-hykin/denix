#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:436
// checkConfigOutput "^\"hello-other\"$" "options.packageFromOtherSet.default.pname" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"hello-other"$/,
    attr:    `options.packageFromOtherSet.default.pname`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.packageFromOtherSet.default.pname @ ./declare-mkPackageOption.nix",
})
