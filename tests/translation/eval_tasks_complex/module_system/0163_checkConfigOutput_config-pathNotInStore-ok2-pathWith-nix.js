#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:802
// checkConfigOutput "\".*/store\"" "config.pathNotInStore.ok2" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("\".*/store\""),
    attr:    `config.pathNotInStore.ok2`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.ok2 @ ./pathWith.nix",
})
