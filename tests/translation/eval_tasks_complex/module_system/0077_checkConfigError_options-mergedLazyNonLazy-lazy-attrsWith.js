#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:510
// checkConfigError "The option `mergedLazyNonLazy' in `.*' is already declared in `.*'\\." "options.mergedLazyNonLazy" "./lazy-attrsWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option `mergedLazyNonLazy' in `.*' is already declared in `.*'\./,
    attr:    `options.mergedLazyNonLazy`,
    modules: [`./lazy-attrsWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.mergedLazyNonLazy @ ./lazy-attrsWith.nix",
})
