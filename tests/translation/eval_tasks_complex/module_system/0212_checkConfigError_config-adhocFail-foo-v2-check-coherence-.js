#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:881
// checkConfigError "Please use.*lib.types.addCheck.*instead" "config.adhocFail.foo" "./v2-check-coherence.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Please use.*lib.types.addCheck.*instead/,
    attr:    `config.adhocFail.foo`,
    modules: [`./v2-check-coherence.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.adhocFail.foo @ ./v2-check-coherence.nix",
})
