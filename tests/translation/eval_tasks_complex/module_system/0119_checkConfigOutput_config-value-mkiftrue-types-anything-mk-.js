#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:649
// checkConfigOutput "^{}$" "config.value.mkiftrue" "./types-anything/mk-mods.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^{}$/,
    attr:    `config.value.mkiftrue`,
    modules: [`./types-anything/mk-mods.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value.mkiftrue @ ./types-anything/mk-mods.nix",
})
