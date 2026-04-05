#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:654
// checkConfigOutput "^\"baz\"$" "config.value.nested.bar.baz" "./types-anything/mk-mods.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"baz"$/,
    attr:    `config.value.nested.bar.baz`,
    modules: [`./types-anything/mk-mods.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value.nested.bar.baz @ ./types-anything/mk-mods.nix",
})
