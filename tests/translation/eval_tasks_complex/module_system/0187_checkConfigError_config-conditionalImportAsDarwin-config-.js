#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:839
// checkConfigError "attribute .*foo.* not found" "config.conditionalImportAsDarwin.config.foo" "./specialArgs-class.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /attribute .*foo.* not found/,
    attr:    `config.conditionalImportAsDarwin.config.foo`,
    modules: [`./specialArgs-class.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conditionalImportAsDarwin.config.foo @ ./specialArgs-class.nix",
})
