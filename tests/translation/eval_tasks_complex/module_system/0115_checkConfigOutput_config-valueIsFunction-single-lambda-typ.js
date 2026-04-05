#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:644
// checkConfigOutput "^true$" "config.valueIsFunction.single-lambda" "./types-anything/functions.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.valueIsFunction.single-lambda`,
    modules: [`./types-anything/functions.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.valueIsFunction.single-lambda @ ./types-anything/functions.nix",
})
