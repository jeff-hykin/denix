#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:849
// checkConfigOutput "2" "config.listOfResult" "./types-valueMeta.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /2/,
    attr:    `config.listOfResult`,
    modules: [`./types-valueMeta.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.listOfResult @ ./types-valueMeta.nix",
})
