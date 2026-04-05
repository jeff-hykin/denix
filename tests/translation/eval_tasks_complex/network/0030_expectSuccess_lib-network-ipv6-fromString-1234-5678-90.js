#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:115
// expectSuccess "lib.network.ipv6.fromString \"1234:5678:90ab:cdef:fedc:ba09:8765:4321/44\"" "{\"address\":\"1234:5678:90ab:cdef:fedc:ba09:8765:4321\",\"prefixLength\":44}"

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (lib.network.ipv6.fromString "1234:5678:90ab:cdef:fedc:ba09:8765:4321/44"
)`,
    pattern: new RegExp('^' + "\\{\"address\":\"1234:5678:90ab:cdef:fedc:ba09:8765:4321\",\"prefixLength\":44\\}" + '$'),
    env: { NIX_PATH },
    label: "lib.network.ipv6.fromString \"1234:5678:90ab:cdef:fedc:ba09:8",
})
