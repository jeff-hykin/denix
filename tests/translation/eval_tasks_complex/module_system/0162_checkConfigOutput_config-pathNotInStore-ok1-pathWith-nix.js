#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:801
// checkConfigOutput "\"/foo/bar\"" "config.pathNotInStore.ok1" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("\"/foo/bar\""),
    attr:    `config.pathNotInStore.ok1`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.ok1 @ ./pathWith.nix",
})
