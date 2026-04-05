#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:653
// checkConfigOutput "^1$" "config.value.nested.foo" "./types-anything/mk-mods.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^1$/,
    attr:    `config.value.nested.foo`,
    modules: [`./types-anything/mk-mods.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value.nested.foo @ ./types-anything/mk-mods.nix",
})
