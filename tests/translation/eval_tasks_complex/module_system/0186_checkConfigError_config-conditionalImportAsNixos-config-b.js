#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:838
// checkConfigError "attribute .*bar.* not found" "config.conditionalImportAsNixos.config.bar" "./specialArgs-class.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /attribute .*bar.* not found/,
    attr:    `config.conditionalImportAsNixos.config.bar`,
    modules: [`./specialArgs-class.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conditionalImportAsNixos.config.bar @ ./specialArgs-class.nix",
})
