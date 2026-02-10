#!/usr/bin/env bash
# Simple test runner for denix
#
# Usage:
#   ./test.sh                    # Run all tests
#   ./test.sh core               # Run core builtin tests
#   ./test.sh runtime            # Run runtime builtin tests
#   ./test.sh translator         # Run translator tests
#   ./test.sh derivation         # Run derivation tests
#   ./test.sh import             # Run import system tests
#   ./test.sh infra              # Run infrastructure tests
#   ./test.sh integration        # Run nixpkgs integration tests
#   ./test.sh <pattern>          # Run tests matching pattern

case "$1" in
    "")
        echo "Running all tests..."
        deno test --allow-all
        ;;
    core)
        echo "Running core builtin tests..."
        deno test --allow-all main/tests/builtins_core_test.js
        ;;
    runtime|builtins)
        echo "Running runtime builtin tests..."
        deno test --allow-all --filter="builtins"
        ;;
    translator)
        echo "Running translator tests..."
        deno test --allow-all \
            main/tests/translator_test.js \
            main/tests/hasattr_test.js \
            main/tests/string_interpolation_test.js \
            main/tests/path_interpolation_test.js
        ;;
    derivation|drv)
        echo "Running derivation tests..."
        deno test --allow-all main/tests/derivation/
        ;;
    import)
        echo "Running import system tests..."
        deno test --allow-all --filter="import"
        ;;
    infra|infrastructure)
        echo "Running infrastructure tests..."
        deno test --allow-all \
            main/tests/fetcher_test.js \
            main/tests/tar_test.js \
            main/tests/nar_hash_test.js \
            main/tests/store_manager_test.js
        ;;
    integration|nixpkgs)
        echo "Running nixpkgs integration tests..."
        deno test --allow-all main/tests/nixpkgs_*.js
        ;;
    *)
        echo "Running tests matching: $1"
        deno test --allow-all --filter="$1"
        ;;
esac
