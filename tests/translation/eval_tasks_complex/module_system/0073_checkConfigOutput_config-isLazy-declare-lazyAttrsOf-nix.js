#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:504
// checkConfigOutput "^true$" "config.isLazy" "./declare-lazyAttrsOf.nix" "./attrsOf-lazy-check.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.isLazy`,
    modules: [`./declare-lazyAttrsOf.nix`, `./attrsOf-lazy-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.isLazy @ ./declare-lazyAttrsOf.nix",
})
