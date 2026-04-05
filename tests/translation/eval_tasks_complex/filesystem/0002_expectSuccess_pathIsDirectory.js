#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/filesystem.sh:76
// expectSuccess "pathIsDirectory /." "true"

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `with (import <nixpkgs/lib>).filesystem; pathIsDirectory /.`,
    pattern: /true/,
    env: { NIX_PATH },
    label: "pathIsDirectory /.",
})
