#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:804
// checkConfigOutput "\"\"" "config.pathNotInStore.ok4" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /""/,
    attr:    `config.pathNotInStore.ok4`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.ok4 @ ./pathWith.nix",
})
