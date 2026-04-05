#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:874
// checkConfigError "ad-hoc.*override.*incompatible" "config.eitherRightFail" "./v2-check-coherence.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /ad-hoc.*override.*incompatible/,
    attr:    `config.eitherRightFail`,
    modules: [`./v2-check-coherence.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.eitherRightFail @ ./v2-check-coherence.nix",
})
