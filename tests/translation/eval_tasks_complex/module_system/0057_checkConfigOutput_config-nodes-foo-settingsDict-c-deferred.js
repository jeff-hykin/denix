#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:474
// checkConfigOutput "\"beta\"" "config.nodes.foo.settingsDict.c" "./deferred-module.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /"beta"/,
    attr:    `config.nodes.foo.settingsDict.c`,
    modules: [`./deferred-module.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.nodes.foo.settingsDict.c @ ./deferred-module.nix",
})
