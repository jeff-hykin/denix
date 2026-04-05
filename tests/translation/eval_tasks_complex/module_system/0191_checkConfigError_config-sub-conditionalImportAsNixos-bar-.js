#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:843
// checkConfigError "attribute .*bar.* not found" "config.sub.conditionalImportAsNixos.bar" "./specialArgs-class.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /attribute .*bar.* not found/,
    attr:    `config.sub.conditionalImportAsNixos.bar`,
    modules: [`./specialArgs-class.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.sub.conditionalImportAsNixos.bar @ ./specialArgs-class.nix",
})
