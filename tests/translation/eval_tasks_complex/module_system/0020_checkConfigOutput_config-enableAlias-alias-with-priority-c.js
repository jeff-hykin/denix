#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:414
// checkConfigOutput "^false$" "config.enableAlias" "./alias-with-priority-can-override.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^false$/,
    attr:    `config.enableAlias`,
    modules: [`./alias-with-priority-can-override.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enableAlias @ ./alias-with-priority-can-override.nix",
})
