#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:837
// checkConfigOutput "\"bar\"" "config.conditionalImportAsNixos.config.foo" "./specialArgs-class.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /"bar"/,
    attr:    `config.conditionalImportAsNixos.config.foo`,
    modules: [`./specialArgs-class.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conditionalImportAsNixos.config.foo @ ./specialArgs-class.nix",
})
