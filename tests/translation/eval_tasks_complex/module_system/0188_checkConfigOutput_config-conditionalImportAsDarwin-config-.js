#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:840
// checkConfigOutput "\"foo\"" "config.conditionalImportAsDarwin.config.bar" "./specialArgs-class.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /"foo"/,
    attr:    `config.conditionalImportAsDarwin.config.bar`,
    modules: [`./specialArgs-class.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.conditionalImportAsDarwin.config.bar @ ./specialArgs-class.nix",
})
