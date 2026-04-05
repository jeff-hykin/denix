#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:652
// checkConfigOutput "^true$" "config.value.mkbefore" "./types-anything/mk-mods.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.value.mkbefore`,
    modules: [`./types-anything/mk-mods.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value.mkbefore @ ./types-anything/mk-mods.nix",
})
