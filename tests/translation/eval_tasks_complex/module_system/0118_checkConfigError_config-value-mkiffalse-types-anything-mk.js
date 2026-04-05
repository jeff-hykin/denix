#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:648
// checkConfigError "attribute .* not found" "config.value.mkiffalse" "./types-anything/mk-mods.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /attribute .* not found/,
    attr:    `config.value.mkiffalse`,
    modules: [`./types-anything/mk-mods.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value.mkiffalse @ ./types-anything/mk-mods.nix",
})
