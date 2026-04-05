#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:809
// checkConfigError "A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: .*/pathWith.nix" "config.pathNotInStore.bad4" "./pathWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp("A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: .*/pathWith.nix"),
    attr:    `config.pathNotInStore.bad4`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.bad4 @ ./pathWith.nix",
})
