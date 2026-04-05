#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:650
// checkConfigOutput "^1$" "config.value.mkdefault" "./types-anything/mk-mods.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^1$/,
    attr:    `config.value.mkdefault`,
    modules: [`./types-anything/mk-mods.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value.mkdefault @ ./types-anything/mk-mods.nix",
})
