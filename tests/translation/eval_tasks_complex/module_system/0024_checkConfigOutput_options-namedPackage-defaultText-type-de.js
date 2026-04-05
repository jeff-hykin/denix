#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:420
// checkConfigOutput "^\"literalExpression\"$" "options.namedPackage.defaultText._type" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"literalExpression"$/,
    attr:    `options.namedPackage.defaultText._type`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.namedPackage.defaultText._type @ ./declare-mkPackageOption.nix",
})
