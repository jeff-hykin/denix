#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:82
// expectSuccess "(internal._ipv6.split \"000a:000b:000c:000d:000e:000f:ffff:aaaa\").address" "[10,11,12,13,14,15,65535,43690]"

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; ((internal._ipv6.split "000a:000b:000c:000d:000e:000f:ffff:aaaa").address
)`,
    pattern: new RegExp('^' + "\\[10,11,12,13,14,15,65535,43690\\]" + '$'),
    env: { NIX_PATH },
    label: "(internal._ipv6.split \"000a:000b:000c:000d:000e:000f:ffff:aa",
})
