#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:439
// checkConfigOutput "^\"pkgs\\.\\\\\"123\\\\\"\\.\\\\\"with\\\\\\\\\\\\\"quote\\\\\"\\.hello\"$" "options.packageInvalidIdentifierExample.example.text" "./declare-mkPackageOption.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"pkgs\.\\"123\\"\.\\"with\\\\\\"quote\\"\.hello"$/,
    attr:    `options.packageInvalidIdentifierExample.example.text`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.packageInvalidIdentifierExample.example.text @ ./declare-mkPackageOption.nix",
})
