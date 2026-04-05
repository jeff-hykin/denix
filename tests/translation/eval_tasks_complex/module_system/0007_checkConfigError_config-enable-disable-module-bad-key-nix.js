#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:371
// checkConfigError "Module ..*disable-module-bad-key.nix. contains a disabledModules item that is an attribute set, presumably a module, that does not have a .key. attribute. .*" "config.enable" "./disable-module-bad-ke

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /Module ..*disable-module-bad-key.nix. contains a disabledModules item that is an attribute set, presumably a module, that does not have a .key. attribute. .*/,
    attr:    `config.enable`,
    modules: [`./disable-module-bad-key.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.enable @ ./disable-module-bad-key.nix",
})
