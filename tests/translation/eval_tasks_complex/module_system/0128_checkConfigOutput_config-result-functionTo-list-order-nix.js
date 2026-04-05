#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:660
// checkConfigOutput "^\"b a\"$" "config.result" "./functionTo/list-order.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"b a"$/,
    attr:    `config.result`,
    modules: [`./functionTo/list-order.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./functionTo/list-order.nix",
})
