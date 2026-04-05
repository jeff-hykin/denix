#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:880
// checkConfigError "ad-hoc.*override.*incompatible" "config.addCheckNested.foo" "./v2-check-coherence.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /ad-hoc.*override.*incompatible/,
    attr:    `config.addCheckNested.foo`,
    modules: [`./v2-check-coherence.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.addCheckNested.foo @ ./v2-check-coherence.nix",
})
