#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:397
// checkConfigError "A definition for option .*. is not of type .*.\\n\\s*- In .*: \\[ \\]" "config.value" "./declare-coerced-value.nix" "./define-value-list.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .*. is not of type .*.\n\s*- In .*: \[ \]/,
    attr:    `config.value`,
    modules: [`./declare-coerced-value.nix`, `./define-value-list.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./declare-coerced-value.nix",
})
