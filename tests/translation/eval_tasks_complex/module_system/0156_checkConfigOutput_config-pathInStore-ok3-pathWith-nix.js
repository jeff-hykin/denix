#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:793
// checkConfigOutput "\".*/store/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15/bin/bash\"" "config.pathInStore.ok3" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("\".*/store/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15/bin/bash\""),
    attr:    `config.pathInStore.ok3`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathInStore.ok3 @ ./pathWith.nix",
})
