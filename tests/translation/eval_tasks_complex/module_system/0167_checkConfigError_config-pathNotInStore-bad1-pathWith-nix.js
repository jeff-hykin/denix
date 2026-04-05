#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:806
// checkConfigError "A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: \".*/0lz9p8xhf89kb1c1kk6jxrzskaiygnlh-bash-5.2-p15.drv\"" "config.pathNotInStore.bad1" "./path

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: new RegExp("A definition for option .* is not of type .path not in the Nix store.. Definition values:\\n\\s*- In .*: \".*/0lz9p8xhf89kb1c1kk6jxrzskaiygnlh-bash-5.2-p15.drv\""),
    attr:    `config.pathNotInStore.bad1`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathNotInStore.bad1 @ ./pathWith.nix",
})
