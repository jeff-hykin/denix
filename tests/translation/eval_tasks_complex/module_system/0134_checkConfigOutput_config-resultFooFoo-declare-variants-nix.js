#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:668
// checkConfigOutput "^\"a b c\"$" "config.resultFooFoo" "./declare-variants.nix" "./define-variant.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"a b c"$/,
    attr:    `config.resultFooFoo`,
    modules: [`./declare-variants.nix`, `./define-variant.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.resultFooFoo @ ./declare-variants.nix",
})
