#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:578
// checkConfigOutput "^{}$" "config" "./freeform-attrsOf.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^{}$/,
    attr:    `config`,
    modules: [`./freeform-attrsOf.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config @ ./freeform-attrsOf.nix",
})
