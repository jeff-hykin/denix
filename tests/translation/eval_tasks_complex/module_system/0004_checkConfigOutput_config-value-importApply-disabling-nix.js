#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:358
// checkConfigOutput "\"abc\"" "config.value" "./importApply-disabling.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /"abc"/,
    attr:    `config.value`,
    modules: [`./importApply-disabling.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./importApply-disabling.nix",
})
