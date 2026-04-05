#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:511
// checkConfigOutput "^11$" "config.lazyResult" "./lazy-attrsWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^11$/,
    attr:    `config.lazyResult`,
    modules: [`./lazy-attrsWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.lazyResult @ ./lazy-attrsWith.nix",
})
