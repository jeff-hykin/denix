#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:788
// checkConfigOutput "^34$" "options.nested.nestedLine34.declarationPositions.0.line" "./declaration-positions.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^34$/,
    attr:    `options.nested.nestedLine34.declarationPositions.0.line`,
    modules: [`./declaration-positions.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.nested.nestedLine34.declarationPositions.0.line @ ./declaration-positions.nix",
})
