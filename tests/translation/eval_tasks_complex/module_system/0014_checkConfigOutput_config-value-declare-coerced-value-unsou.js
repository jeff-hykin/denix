#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:403
// checkConfigOutput "^12$" "config.value" "./declare-coerced-value-unsound.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^12$/,
    attr:    `config.value`,
    modules: [`./declare-coerced-value-unsound.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./declare-coerced-value-unsound.nix",
})
