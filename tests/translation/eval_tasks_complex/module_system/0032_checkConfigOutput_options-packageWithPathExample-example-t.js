#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:428
// checkConfigOutput "^\"literalExpression\"$" "options.packageWithPathExample.example._type" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"literalExpression"$/,
    attr:    `options.packageWithPathExample.example._type`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.packageWithPathExample.example._type @ ./declare-mkPackageOption.nix",
})
