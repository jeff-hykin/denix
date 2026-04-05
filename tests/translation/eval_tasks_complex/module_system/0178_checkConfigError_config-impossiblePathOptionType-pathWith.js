#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:825
// checkConfigError "In pathWith, inStore means the path must be absolute" "config.impossiblePathOptionType" "./pathWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /In pathWith, inStore means the path must be absolute/,
    attr:    `config.impossiblePathOptionType`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.impossiblePathOptionType @ ./pathWith.nix",
})
