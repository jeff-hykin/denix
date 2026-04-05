#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/modules.sh:848
// checkConfigOutput "[\"foo\", \"bar\"]" "config.attrsOfResult" "./types-valueMeta.nix"

import { checkConfigOutput } from "../shared_tooling/index.js"

await checkConfigOutput({
    pattern: /["foo", "bar"]/,
    attr:    `config.attrsOfResult`,
    modules: [`./types-valueMeta.nix`],
    fixtureRoot: "nixpkgs_lib/lib/tests/modules",
    label: "config.attrsOfResult @ ./types-valueMeta.nix",
})
