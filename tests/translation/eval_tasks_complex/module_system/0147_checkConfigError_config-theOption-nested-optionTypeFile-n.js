#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:725
// checkConfigError "The option .theOption.nested. in .other.nix. is already declared in .optionTypeFile.nix." "config.theOption.nested" "./optionTypeFile.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .theOption.nested. in .other.nix. is already declared in .optionTypeFile.nix./,
    attr:    `config.theOption.nested`,
    modules: [`./optionTypeFile.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.theOption.nested @ ./optionTypeFile.nix",
})
