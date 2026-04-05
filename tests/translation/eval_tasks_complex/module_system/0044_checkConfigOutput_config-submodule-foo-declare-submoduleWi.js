#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:444
// checkConfigOutput "^\"foo\"$" "config.submodule.foo" "./declare-submoduleWith-special.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /^"foo"$/,
    attr:    `config.submodule.foo`,
    modules: [`./declare-submoduleWith-special.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.submodule.foo @ ./declare-submoduleWith-special.nix",
})
