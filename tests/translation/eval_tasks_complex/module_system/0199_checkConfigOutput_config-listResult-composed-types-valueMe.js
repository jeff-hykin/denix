#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:857
// checkConfigOutput "42" "config.listResult" "./composed-types-valueMeta.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /42/,
    attr:    `config.listResult`,
    modules: [`./composed-types-valueMeta.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.listResult @ ./composed-types-valueMeta.nix",
})
