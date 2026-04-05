#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:667
// checkConfigOutput "^\"a b y z\"$" "config.resultFooBar" "./declare-variants.nix" "./define-variant.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"a b y z"$/,
    attr:    `config.resultFooBar`,
    modules: [`./declare-variants.nix`, `./define-variant.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.resultFooBar @ ./declare-variants.nix",
})
