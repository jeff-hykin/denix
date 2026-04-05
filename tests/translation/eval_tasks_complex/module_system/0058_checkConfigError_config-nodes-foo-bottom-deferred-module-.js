#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:476
// checkConfigError "In `the-file-that-contains-the-bad-config.nix, via option default': \"bogus\"" "config.nodes.foo.bottom" "./deferred-module.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /In `the-file-that-contains-the-bad-config.nix, via option default': "bogus"/,
    attr:    `config.nodes.foo.bottom`,
    modules: [`./deferred-module.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.nodes.foo.bottom @ ./deferred-module.nix",
})
