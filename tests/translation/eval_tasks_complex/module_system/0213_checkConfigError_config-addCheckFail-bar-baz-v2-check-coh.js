#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:882
// checkConfigError "A definition for option .* is not of type .*" "config.addCheckFail.bar.baz" "./v2-check-coherence.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .* is not of type .*/,
    attr:    `config.addCheckFail.bar.baz`,
    modules: [`./v2-check-coherence.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.addCheckFail.bar.baz @ ./v2-check-coherence.nix",
})
