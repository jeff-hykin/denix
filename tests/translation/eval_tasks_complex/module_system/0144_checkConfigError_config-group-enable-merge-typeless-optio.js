#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:718
// checkConfigError "The option .group..*would be a parent of the following options, but its type .<no description>. does not support nested options.\\n\\s*- option.s. with prefix .group.enable..*" "config.group.enable" 

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .group..*would be a parent of the following options, but its type .<no description>. does not support nested options.\n\s*- option.s. with prefix .group.enable..*/,
    attr:    `config.group.enable`,
    modules: [`./merge-typeless-option.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.group.enable @ ./merge-typeless-option.nix",
})
