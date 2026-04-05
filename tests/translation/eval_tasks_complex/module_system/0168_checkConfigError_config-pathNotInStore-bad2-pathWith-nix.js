#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:807
// checkConfigError "A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: \".*/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15\"" "config.pathNotInStore.bad2" "./pathWith

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp("A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: \".*/0fb3ykw9r5hpayd05sr0cizwadzq1d8q-bash-5.2-p15\""),
    attr:    `config.pathNotInStore.bad2`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.bad2 @ ./pathWith.nix",
})
