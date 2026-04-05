#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:431
// checkConfigError "The option .undefinedPackage. was accessed but has no value defined. Try setting the option." "config.undefinedPackage" "./declare-mkPackageOption.nix"

import { checkConfigError } from "../shared_tooling/index.js"

await checkConfigError({
    pattern: /The option .undefinedPackage. was accessed but has no value defined. Try setting the option./,
    attr:    `config.undefinedPackage`,
    modules: [`./declare-mkPackageOption.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.undefinedPackage @ ./declare-mkPackageOption.nix",
})
