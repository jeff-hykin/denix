#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:395
// checkConfigOutput "^\"42\"$" "config.value" "./declare-coerced-value.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"42"$/,
    attr:    `config.value`,
    modules: [`./declare-coerced-value.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./declare-coerced-value.nix",
})
