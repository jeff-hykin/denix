#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:480
// checkConfigOutput "the-file.nix" "config.submodule.internalFiles.0" "./submoduleFiles.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /the-file.nix/,
    attr:    `config.submodule.internalFiles.0`,
    modules: [`./submoduleFiles.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.internalFiles.0 @ ./submoduleFiles.nix",
})
