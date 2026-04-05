#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:847
// checkConfigOutput "\\{\\}" "options.str.valueMeta" "./types-valueMeta.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /\{\}/,
    attr:    `options.str.valueMeta`,
    modules: [`./types-valueMeta.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.str.valueMeta @ ./types-valueMeta.nix",
})
