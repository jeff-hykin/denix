#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:888
// checkConfigError "Did you mean .set.\\?" "config" "./error-typo-outside-with-nested.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Did you mean .set.\?/,
    attr:    `config`,
    modules: [`./error-typo-outside-with-nested.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config @ ./error-typo-outside-with-nested.nix",
})
