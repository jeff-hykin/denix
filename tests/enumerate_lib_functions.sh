#!/usr/bin/env bash
# Enumerates all function-valued attributes (recursively) exposed by
# tests/nixpkgs_lib/flake.nix under its `lib` output.
#
# Usage:
#   ./enumerate_lib_functions.sh           # prints dotted attr paths, one per line
#   ./enumerate_lib_functions.sh --json    # prints as a JSON array

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FLAKE_PATH="${SCRIPT_DIR}/nixpkgs_lib"

FORMAT="lines"
if [[ "${1:-}" == "--json" ]]; then
  FORMAT="json"
fi

# Nix expression: import the lib directly, then walk lib.* collecting paths of
# functions.
# - We import the lib dir directly (rather than going via the flake) because the
#   flake's lib/default.nix references ../maintainers/maintainer-list.nix, which
#   escapes the flake's store copy and fails under getFlake.
# - tryEval wraps each access so we skip attrs that throw (e.g. abort/assert traps).
# - maxDepth guards against cycles / deeply self-referential structures.
NIX_EXPR='
  let
    lib     = import '"${FLAKE_PATH}"'/lib;
    maxDepth = 8;
    walk = depth: prefix: value:
      if depth > maxDepth then []
      else
        let
          names = builtins.attrNames value;
          step  = name:
            let
              path   = if prefix == "" then name else prefix + "." + name;
              probe  = builtins.tryEval value.${name};
            in
              if !probe.success then []
              else
                let v = probe.value; in
                if builtins.isFunction v then [ path ]
                else if builtins.isAttrs v
                     && !(v ? _type)
                     && !(v ? outPath)
                  then walk (depth + 1) path v
                else [];
        in
          builtins.concatLists (builtins.map step names);
  in
    walk 0 "" lib
'

if [[ "$FORMAT" == "json" ]]; then
  nix eval --impure --json --expr "$NIX_EXPR"
else
  nix eval --impure --json --expr "$NIX_EXPR" \
    | nix run nixpkgs#jq -- -r '.[]' \
    | sort -u
fi
