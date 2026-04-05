#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:124
// expectSuccess "mkEUI64Suffix \"12:34:56:78:9A:bc\"" "\"1034:56ff:fe78:9abc\""

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (mkEUI64Suffix "12:34:56:78:9A:bc"
)`,
    pattern: new RegExp('^' + "\"1034:56ff:fe78:9abc\"" + '$'),
    env: { NIX_PATH },
    label: "mkEUI64Suffix \"12:34:56:78:9A:bc\"",
})
