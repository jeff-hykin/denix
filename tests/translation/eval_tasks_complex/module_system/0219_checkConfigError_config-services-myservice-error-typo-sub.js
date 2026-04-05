#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:891
// checkConfigError "Did you mean .services\\.myservice\\.port. or .services\\.myservice\\.enable.\\?" "config.services.myservice" "./error-typo-submodule.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Did you mean .services\.myservice\.port. or .services\.myservice\.enable.\?/,
    attr:    `config.services.myservice`,
    modules: [`./error-typo-submodule.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.services.myservice @ ./error-typo-submodule.nix",
})
