#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/debug.sh:62
// expectFailure "throwTestFailures {\n  failures = [\n    {\n      name = \"testDerivation\";\n      expected = builtins.derivation {\n        name = \"a\";\n        builder = \"bash\";\n        system = \"x86_64-lin

import { expectFailure, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectFailure({
    expr: `with (import <nixpkgs/lib>).debug; throwTestFailures {
  failures = [
    {
      name = "testDerivation";
      expected = builtins.derivation {
        name = "a";
        builder = "bash";
        system = "x86_64-linux";
      };
      result = builtins.derivation {
        name = "b";
        builder = "bash";
        system = "x86_64-linux";
      };
    }
  ];
}`,
    pattern: /1 tests failed/,
    env: { NIX_PATH },
    label: "throwTestFailures {\n  failures = [\n    {\n      name = \"testD",
})
