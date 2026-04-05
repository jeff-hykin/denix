#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:503
// checkConfigError "is not lazy" "config.isLazy" "./declare-attrsOf.nix" "./attrsOf-lazy-check.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /is not lazy/,
    attr:    `config.isLazy`,
    modules: [`./declare-attrsOf.nix`, `./attrsOf-lazy-check.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.isLazy @ ./declare-attrsOf.nix",
})
