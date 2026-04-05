#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:845
// checkConfigOutput "\"foo\"" "config.sub.conditionalImportAsDarwin.bar" "./specialArgs-class.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /"foo"/,
    attr:    `config.sub.conditionalImportAsDarwin.bar`,
    modules: [`./specialArgs-class.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.sub.conditionalImportAsDarwin.bar @ ./specialArgs-class.nix",
})
