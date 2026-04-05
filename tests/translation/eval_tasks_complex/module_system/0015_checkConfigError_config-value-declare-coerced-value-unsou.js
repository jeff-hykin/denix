#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:404
// checkConfigError "A definition for option .* is not of type .*.\\n\\s*- In .*: \"1000\"" "config.value" "./declare-coerced-value-unsound.nix" "./define-value-string-bigint.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .* is not of type .*.\n\s*- In .*: "1000"/,
    attr:    `config.value`,
    modules: [`./declare-coerced-value-unsound.nix`, `./define-value-string-bigint.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./declare-coerced-value-unsound.nix",
})
