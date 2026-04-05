#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:477
// checkConfigError ".*lib/tests/modules/deferred-module-error.nix, via option deferred [(]:anon-1:anon-1:anon-1[)] does not look like a module." "config.result" "./deferred-module-error.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp(".*lib/tests/modules/deferred-module-error.nix, via option deferred [(]:anon-1:anon-1:anon-1[)] does not look like a module."),
    attr:    `config.result`,
    modules: [`./deferred-module-error.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./deferred-module-error.nix",
})
