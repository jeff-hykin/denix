#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:794
// checkConfigError "A definition for option .* is not of type .path in the Nix store.. Definition values:\\n\\s*- In .*: \"\"" "config.pathInStore.bad1" "./pathWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .* is not of type .path in the Nix store.. Definition values:\n\s*- In .*: ""/,
    attr:    `config.pathInStore.bad1`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathInStore.bad1 @ ./pathWith.nix",
})
