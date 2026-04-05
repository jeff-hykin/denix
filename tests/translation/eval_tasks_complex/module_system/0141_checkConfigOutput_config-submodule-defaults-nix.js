#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:684
// checkConfigOutput "{}" "config.submodule" "./defaults.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /{}/,
    attr:    `config.submodule`,
    modules: [`./defaults.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule @ ./defaults.nix",
})
