#!/usr/bin/env bash
# Runs the upstream Nix language test suite (tests/functional/lang.sh)
# against the system `nix` install, using the authentic common.sh /
# init.sh harness. We stub the Meson-generated subst-vars.sh ourselves
# since we don't build Nix from source.
#
# In addition, a `nix-instantiate` spy (tools/nix_eval_spy.ts) intercepts
# every invocation and records the full CLI + env + cwd to
# tests/nix_evals/<relative-path>_eval.json so invocations can be
# replayed later without the Meson/bash harness.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR/nix_tests/nix_lang_tests"
FUNCTIONAL_DIR="$REPO_ROOT/tests/functional"

# --- locate a real nix install ---------------------------------------------
NIX_BIN_DIR="${NIX_BIN_DIR:-/nix/var/nix/profiles/default/bin}"
if [[ ! -x "$NIX_BIN_DIR/nix-instantiate" ]]; then
  if command -v nix-instantiate >/dev/null 2>&1; then
    NIX_BIN_DIR="$(dirname "$(command -v nix-instantiate)")"
  else
    echo "error: nix-instantiate not found" >&2
    exit 1
  fi
fi
NIX_VERSION="$("$NIX_BIN_DIR/nix-instantiate" --version | awk '{print $NF}')"
NIX_SYSTEM="$("$NIX_BIN_DIR/nix-instantiate" --eval -E 'builtins.currentSystem' 2>/dev/null | tr -d '"')"

# --- carve out a build dir the harness can write into ----------------------
BUILD_DIR="${BUILD_DIR:-/tmp/denix_nix_test_build}"
mkdir -p "$BUILD_DIR/common"

BASH_BIN="$(command -v bash)"
COREUTILS_PREFIX="/usr"
DOT_BIN="${DOT_BIN:-/usr/bin/true}"
SANDBOX_SHELL=""

# SHIM_DIR must exist before subst-vars.sh is written (bindir points here).
SHIM_DIR="$BUILD_DIR/shim"
mkdir -p "$SHIM_DIR"

cat > "$BUILD_DIR/common/subst-vars.sh" <<EOF
# Auto-generated stub — replaces the Meson-generated file
if [[ -z "\${COMMON_SUBST_VARS_SH_SOURCED-}" ]]; then
COMMON_SUBST_VARS_SH_SOURCED=1
bash=$BASH_BIN
# Point bindir at our shim dir so that when common/paths.sh does
# \`export PATH="\$bindir:\$PATH"\`, our nix-instantiate spy wins over the
# real binary. Other nix tools (nix-store etc.) fall through to the real
# NIX_BIN_DIR which is later in PATH.
bindir=$SHIM_DIR
coreutils=$COREUTILS_PREFIX
dot=$DOT_BIN
busybox="$SANDBOX_SHELL"
version=$NIX_VERSION
system=$NIX_SYSTEM
fi
EOF

# The harness references \$_NIX_TEST_BUILD_DIR/config.nix — a few tests
# import it. Provide a minimal one; lang tests mostly don't need it.
cat > "$BUILD_DIR/config.nix" <<EOF
rec {
  inherit (builtins) currentSystem;
  system = currentSystem;
  shell = "$BASH_BIN";
  path = "$NIX_BIN_DIR:$COREUTILS_PREFIX/bin";
  mkDerivation = args: derivation ({
    inherit system;
    builder = shell;
    args = [ "-e" args.builder or (builtins.toFile "builder.sh" "\${args.buildCommand}") ];
    PATH = path;
  } // removeAttrs args [ "builder" "buildCommand" ]);
}
EOF

# test-root.sh does `realpath "$TMPDIR/nix-test"` which needs the dir to exist
mkdir -p "${TMPDIR:-/tmp}/nix-test"

# lang.sh and .postprocess scripts use GNU-sed syntax. Shim `sed` to gsed.
if [[ "$(uname)" == "Darwin" ]]; then
  if ! command -v gsed >/dev/null 2>&1; then
    echo "error: need GNU sed (brew install gnu-sed)" >&2
    exit 1
  fi
  ln -sf "$(command -v gsed)" "$SHIM_DIR/sed"
fi

# --- nix-instantiate spy --------------------------------------------------
DENO_BIN="$(command -v deno || true)"
if [[ -z "$DENO_BIN" ]]; then
  echo "error: deno not found" >&2
  exit 1
fi
SPY_SCRIPT="$SCRIPT_DIR/tools/nix_eval_spy.ts"
export NIX_EVAL_SHIM_REAL="$NIX_BIN_DIR/nix-instantiate"
export NIX_EVAL_SHIM_RECORD_DIR="${NIX_EVAL_SHIM_RECORD_DIR:-$SCRIPT_DIR/nix_evals}"
export NIX_EVAL_SHIM_SCRIPT="$SPY_SCRIPT"
# Give deno a cache dir that doesn't depend on $HOME (the harness sets
# HOME=/fake-home for each test, which would break deno's default cache).
export DENO_DIR="${DENO_DIR:-$BUILD_DIR/deno_cache}"
mkdir -p "$NIX_EVAL_SHIM_RECORD_DIR" "$DENO_DIR"

# Pre-cache once so we don't pay startup on every invocation.
"$DENO_BIN" cache "$SPY_SCRIPT" >/dev/null 2>&1 || true

cat > "$SHIM_DIR/nix-instantiate" <<EOF
#!/usr/bin/env bash
exec "$DENO_BIN" run --allow-all --quiet "$SPY_SCRIPT" "\$@"
EOF
chmod +x "$SHIM_DIR/nix-instantiate"

# Prepend shim dir + system paths so stock `env`, `diff`, etc. aren't
# shadowed by any user shims in ~/Commands or similar. SHIM_DIR comes
# BEFORE NIX_BIN_DIR so the harness picks our spy first.
export PATH="$SHIM_DIR:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:$NIX_BIN_DIR:$PATH"

# --- env required by common.sh --------------------------------------------
export _NIX_TEST_SOURCE_DIR="$FUNCTIONAL_DIR"
export _NIX_TEST_BUILD_DIR="$BUILD_DIR"
export TEST_SUITE_NAME="denix"
export TEST_NAME="lang"
export NIX_STORE=""
export NIX_REMOTE_=""

# --- run the authentic lang.sh harness ------------------------------------
cd "$FUNCTIONAL_DIR"
echo "Nix:     $NIX_BIN_DIR/nix-instantiate ($NIX_VERSION, $NIX_SYSTEM)"
echo "Build:   $BUILD_DIR"
echo "Records: $NIX_EVAL_SHIM_RECORD_DIR"
echo "--- running lang.sh ---"
exec "$BASH_BIN" lang.sh
