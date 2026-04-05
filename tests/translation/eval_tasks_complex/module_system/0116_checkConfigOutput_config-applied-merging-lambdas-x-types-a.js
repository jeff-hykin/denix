#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:645
// checkConfigOutput "^null$" "config.applied.merging-lambdas.x" "./types-anything/functions.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^null$/,
    attr:    `config.applied.merging-lambdas.x`,
    modules: [`./types-anything/functions.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.applied.merging-lambdas.x @ ./types-anything/functions.nix",
})
