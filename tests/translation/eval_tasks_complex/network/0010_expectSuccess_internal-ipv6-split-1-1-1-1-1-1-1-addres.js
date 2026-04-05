#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:90
// expectSuccess "(internal._ipv6.split \"1:1:1:1:1:1:1::\").address" "[1,1,1,1,1,1,1,0]"

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; ((internal._ipv6.split "1:1:1:1:1:1:1::").address
)`,
    pattern: new RegExp('^' + "\\[1,1,1,1,1,1,1,0\\]" + '$'),
    env: { NIX_PATH },
    label: "(internal._ipv6.split \"1:1:1:1:1:1:1::\").address",
})
