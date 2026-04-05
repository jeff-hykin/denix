#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:659
// checkConfigError "A definition for option .fun.<function body>. is not of type .string.. Definition values:\\n\\s*- In .*wrong-type.nix" "config.result" "./functionTo/wrong-type.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /A definition for option .fun.<function body>. is not of type .string.. Definition values:\n\s*- In .*wrong-type.nix/,
    attr:    `config.result`,
    modules: [`./functionTo/wrong-type.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./functionTo/wrong-type.nix",
})
