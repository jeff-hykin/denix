#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:643
// checkConfigError "The option .value.multiple-lambdas.<function body>. has conflicting option types" "config.applied.multiple-lambdas" "./types-anything/functions.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .value.multiple-lambdas.<function body>. has conflicting option types/,
    attr:    `config.applied.multiple-lambdas`,
    modules: [`./types-anything/functions.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.applied.multiple-lambdas @ ./types-anything/functions.nix",
})
