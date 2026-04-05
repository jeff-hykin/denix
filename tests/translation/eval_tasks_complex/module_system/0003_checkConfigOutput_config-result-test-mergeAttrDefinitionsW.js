#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:176
// checkConfigOutput "^true$" "config.result" "./test-mergeAttrDefinitionsWithPrio.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.result`,
    modules: [`./test-mergeAttrDefinitionsWithPrio.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./test-mergeAttrDefinitionsWithPrio.nix",
})
