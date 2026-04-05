#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:890
// checkConfigError "Did you mean .enable., .ebe. or .enabled.\\?" "config" "./error-typo-large-attrset.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Did you mean .enable., .ebe. or .enabled.\?/,
    attr:    `config`,
    modules: [`./error-typo-large-attrset.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config @ ./error-typo-large-attrset.nix",
})
