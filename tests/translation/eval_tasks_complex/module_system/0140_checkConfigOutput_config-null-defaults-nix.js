#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:683
// checkConfigOutput "null" "config.null" "./defaults.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /null/,
    attr:    `config.null`,
    modules: [`./defaults.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.null @ ./defaults.nix",
})
