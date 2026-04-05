#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:841
// checkConfigOutput "\"nixos\"" "config.sub.nixos.foo" "./specialArgs-class.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /"nixos"/,
    attr:    `config.sub.nixos.foo`,
    modules: [`./specialArgs-class.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.sub.nixos.foo @ ./specialArgs-class.nix",
})
