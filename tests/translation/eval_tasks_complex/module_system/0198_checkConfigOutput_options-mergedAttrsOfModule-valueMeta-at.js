#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:854
// checkConfigOutput "42" "options.mergedAttrsOfModule.valueMeta.attrs.foo.configuration.options.bar.value" "./composed-types-valueMeta.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /42/,
    attr:    `options.mergedAttrsOfModule.valueMeta.attrs.foo.configuration.options.bar.value`,
    modules: [`./composed-types-valueMeta.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "options.mergedAttrsOfModule.valueMeta.attrs.foo.configuration.options.bar.value @ ./composed-types-valueMeta.nix",
})
