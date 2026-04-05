#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:103
// expectFailure "internal._ipv6.split \"::10000\"" "0x10000 is not a valid u16 integer"

import { expectFailure, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectFailure({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (internal._ipv6.split "::10000"
)`,
    pattern: /0x10000 is not a valid u16 integer/,
    env: { NIX_PATH },
    label: "internal._ipv6.split \"::10000\"",
})
