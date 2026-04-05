#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:507
// checkConfigOutput "^\"empty\"$" "config.value.foo" "./declare-lazyAttrsOf.nix" "./attrsOf-conditional-check.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"empty"$/,
    attr:    `config.value.foo`,
    modules: [`./declare-lazyAttrsOf.nix`, `./attrsOf-conditional-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value.foo @ ./declare-lazyAttrsOf.nix",
})
