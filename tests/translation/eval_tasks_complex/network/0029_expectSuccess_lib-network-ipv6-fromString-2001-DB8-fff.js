#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:114
// expectSuccess "lib.network.ipv6.fromString \"2001:DB8::ffff/64\"" "{\"address\":\"2001:db8:0:0:0:0:0:ffff\",\"prefixLength\":64}"

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (lib.network.ipv6.fromString "2001:DB8::ffff/64"
)`,
    pattern: new RegExp('^' + "\\{\"address\":\"2001:db8:0:0:0:0:0:ffff\",\"prefixLength\":64\\}" + '$'),
    env: { NIX_PATH },
    label: "lib.network.ipv6.fromString \"2001:DB8::ffff/64\"",
})
