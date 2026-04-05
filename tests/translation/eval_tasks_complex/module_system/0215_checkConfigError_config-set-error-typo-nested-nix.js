#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:887
// checkConfigError "Did you mean .set\\.enable.\\?" "config.set" "./error-typo-nested.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Did you mean .set\.enable.\?/,
    attr:    `config.set`,
    modules: [`./error-typo-nested.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.set @ ./error-typo-nested.nix",
})
