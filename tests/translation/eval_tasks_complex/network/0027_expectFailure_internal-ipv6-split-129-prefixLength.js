#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:110
// expectFailure "(internal._ipv6.split \"::/129\").prefixLength" "IPv6 subnet should be in range \\[1;128\\], got 129"

import { expectFailure, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectFailure({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; ((internal._ipv6.split "::/129").prefixLength
)`,
    pattern: /IPv6 subnet should be in range \[1;128\], got 129/,
    env: { NIX_PATH },
    label: "(internal._ipv6.split \"::/129\").prefixLength",
})
