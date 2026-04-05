#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:813
// checkConfigOutput "\"./this/is/relative\"" "config.anyPath.ok2" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("\"./this/is/relative\""),
    attr:    `config.anyPath.ok2`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.anyPath.ok2 @ ./pathWith.nix",
})
