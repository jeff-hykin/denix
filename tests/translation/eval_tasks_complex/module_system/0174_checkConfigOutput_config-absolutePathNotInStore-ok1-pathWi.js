#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:817
// checkConfigOutput "\"/this/is/absolute\"" "config.absolutePathNotInStore.ok1" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("\"/this/is/absolute\""),
    attr:    `config.absolutePathNotInStore.ok1`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.absolutePathNotInStore.ok1 @ ./pathWith.nix",
})
