#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:405
// checkConfigError "toInt: Could not convert .* to int" "config.value" "./declare-coerced-value-unsound.nix" "./define-value-string-arbitrary.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /toInt: Could not convert .* to int/,
    attr:    `config.value`,
    modules: [`./declare-coerced-value-unsound.nix`, `./define-value-string-arbitrary.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.value @ ./declare-coerced-value-unsound.nix",
})
