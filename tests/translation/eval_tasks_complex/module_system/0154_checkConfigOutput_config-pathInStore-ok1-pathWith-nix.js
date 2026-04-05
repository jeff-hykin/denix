#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:791
// checkConfigOutput "\".*/store/0lz9p8xhf89kb1c1kk6jxrzskaiygnlh-bash-5.2-p15.drv\"" "config.pathInStore.ok1" "./pathWith.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: new RegExp("\".*/store/0lz9p8xhf89kb1c1kk6jxrzskaiygnlh-bash-5.2-p15.drv\""),
    attr:    `config.pathInStore.ok1`,
    modules: [`./pathWith.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.pathInStore.ok1 @ ./pathWith.nix",
})
