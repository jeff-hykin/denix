#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:870
// checkConfigError "ad-hoc.*override.*incompatible" "config.adhocOuterFail.bar" "./v2-check-coherence.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /ad-hoc.*override.*incompatible/,
    attr:    `config.adhocOuterFail.bar`,
    modules: [`./v2-check-coherence.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.adhocOuterFail.bar @ ./v2-check-coherence.nix",
})
