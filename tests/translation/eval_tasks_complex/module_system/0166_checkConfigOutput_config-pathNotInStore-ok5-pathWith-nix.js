#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:805
// checkConfigOutput "\".*/store/.links\"" "config.pathNotInStore.ok5" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("\".*/store/.links\""),
    attr:    `config.pathNotInStore.ok5`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.ok5 @ ./pathWith.nix",
})
