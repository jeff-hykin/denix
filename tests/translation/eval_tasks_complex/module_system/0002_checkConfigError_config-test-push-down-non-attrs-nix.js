#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:174
// checkConfigError "In module .*test-push-down-non-attrs.nix., you're trying to define a value of type `bool'\\n\\s*rather than an attribute set for the option" "config" "./test-push-down-non-attrs.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /In module .*test-push-down-non-attrs.nix., you're trying to define a value of type `bool'\n\s*rather than an attribute set for the option/,
    attr:    `config`,
    modules: [`./test-push-down-non-attrs.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config @ ./test-push-down-non-attrs.nix",
})
