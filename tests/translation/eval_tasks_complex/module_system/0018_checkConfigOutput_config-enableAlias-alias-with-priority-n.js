#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:412
// checkConfigOutput "^true$" "config.enableAlias" "./alias-with-priority.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.enableAlias`,
    modules: [`./alias-with-priority.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enableAlias @ ./alias-with-priority.nix",
})
