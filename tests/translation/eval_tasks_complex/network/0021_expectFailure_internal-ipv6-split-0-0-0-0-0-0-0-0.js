#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:102
// expectFailure "internal._ipv6.split \"0::0:0:0:0:0:0:0\"" "is not a valid IPv6 address"

import { expectFailure, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectFailure({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (internal._ipv6.split "0::0:0:0:0:0:0:0"
)`,
    pattern: /is not a valid IPv6 address/,
    env: { NIX_PATH },
    label: "internal._ipv6.split \"0::0:0:0:0:0:0:0\"",
})
