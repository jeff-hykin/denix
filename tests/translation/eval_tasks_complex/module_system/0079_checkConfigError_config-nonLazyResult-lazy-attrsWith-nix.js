#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:512
// checkConfigError "infinite recursion encountered" "config.nonLazyResult" "./lazy-attrsWith.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /infinite recursion encountered/,
    attr:    `config.nonLazyResult`,
    modules: [`./lazy-attrsWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.nonLazyResult @ ./lazy-attrsWith.nix",
})
