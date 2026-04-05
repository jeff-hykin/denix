#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:156
// expectFailure "mkEUI64Suffix \"ab:cd:ef:gh:jk:lm\"" "is not a valid MAC address \\(expected 6 octets of hex digits\\)"

import { expectFailure, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectFailure({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (mkEUI64Suffix "ab:cd:ef:gh:jk:lm"
)`,
    pattern: /is not a valid MAC address \(expected 6 octets of hex digits\)/,
    env: { NIX_PATH },
    label: "mkEUI64Suffix \"ab:cd:ef:gh:jk:lm\"",
})
