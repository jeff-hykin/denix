#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:731
// checkConfigError "Type foo defines both `functor.payload` and `functor.wrapped` at the same time, which is not supported." "config.result" "./default-type-merge-both.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Type foo defines both `functor.payload` and `functor.wrapped` at the same time, which is not supported./,
    attr:    `config.result`,
    modules: [`./default-type-merge-both.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.result @ ./default-type-merge-both.nix",
})
