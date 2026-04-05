#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:120
// expectSuccess "mkEUI64Suffix \"00:11:22:aa:bb:cc\"" "\"211:22ff:feaa:bbcc\""

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (mkEUI64Suffix "00:11:22:aa:bb:cc"
)`,
    pattern: new RegExp('^' + "\"211:22ff:feaa:bbcc\"" + '$'),
    env: { NIX_PATH },
    label: "mkEUI64Suffix \"00:11:22:aa:bb:cc\"",
})
