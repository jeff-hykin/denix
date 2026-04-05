#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nixpkgs_lib_tests/lib/tests/network.sh:130
// expectSuccess "mkEUI64Suffix \"ff-ff-ff-ff-ff-ff\"" "\"fdff:ffff:feff:ffff\""

import { expectSuccess, SOURCE_CODE_ROOT } from "../shared_tooling/index.js"

const NIX_PATH = `nixpkgs=${SOURCE_CODE_ROOT}nixpkgs_lib`

await expectSuccess({
    expr: `let
  lib = import <nixpkgs/lib>;
  internal = import <nixpkgs/lib/network/internal.nix> { inherit lib; };
in
with lib; with lib.network; (mkEUI64Suffix "ff-ff-ff-ff-ff-ff"
)`,
    pattern: new RegExp('^' + "\"fdff:ffff:feff:ffff\"" + '$'),
    env: { NIX_PATH },
    label: "mkEUI64Suffix \"ff-ff-ff-ff-ff-ff\"",
})
