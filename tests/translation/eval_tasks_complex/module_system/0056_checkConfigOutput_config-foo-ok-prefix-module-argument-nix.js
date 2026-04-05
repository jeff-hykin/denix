#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:470
// checkConfigOutput "^true$" "config.foo.ok" "./prefix-module-argument.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^true$/,
    attr:    `config.foo.ok`,
    modules: [`./prefix-module-argument.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.foo.ok @ ./prefix-module-argument.nix",
})
