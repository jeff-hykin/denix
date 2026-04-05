#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:795
// checkConfigError "A definition for option .* is not of type .path in the Nix store.. Definition values:\\n\\s*- In .*: \".*/store\"" "config.pathInStore.bad2" "./pathWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp("A definition for option .* is not of type .path in the Nix store.. Definition values:\\n\\s*- In .*: \".*/store\""),
    attr:    `config.pathInStore.bad2`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathInStore.bad2 @ ./pathWith.nix",
})
