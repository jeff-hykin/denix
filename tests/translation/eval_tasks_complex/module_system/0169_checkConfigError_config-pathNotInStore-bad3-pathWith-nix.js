#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:808
// checkConfigError "A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: \".*/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15/bin/bash\"" "config.pathNotInStore.bad3" ".

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp("A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: \".*/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15/bin/bash\""),
    attr:    `config.pathNotInStore.bad3`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.bad3 @ ./pathWith.nix",
})
