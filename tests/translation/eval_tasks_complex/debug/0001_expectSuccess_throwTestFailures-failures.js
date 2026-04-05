#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/debug.sh:58
// expectSuccess "throwTestFailures { failures = [ ]; }" "null"

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `with (import <nixpkgs/lib>).debug; throwTestFailures { failures = [ ]; }`,
    pattern: /null/,
    env: { NIX_PATH },
    label: "throwTestFailures { failures = [ ]; }",
})
