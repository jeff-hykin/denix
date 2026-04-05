#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:889
// checkConfigError "Did you mean .bar., .baz. or .foo.\\?" "config" "./error-typo-multiple-suggestions.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Did you mean .bar., .baz. or .foo.\?/,
    attr:    `config`,
    modules: [`./error-typo-multiple-suggestions.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config @ ./error-typo-multiple-suggestions.nix",
})
