#!/usr/bin/env bash
# Simple test runner for denix
#
# Usage:
#   ./test.sh                    # Run all tests
#   ./test.sh types              # Type checking tests (Task 1)
#   ./test.sh lists              # List operation tests (Task 2)
#   ./test.sh attrs              # Attrset tests (Task 3)
#   ./test.sh strings            # String tests (Task 4)
#   ./test.sh math               # Math tests (Task 5)
#   ./test.sh paths              # Path/file tests (Task 6)
#   ./test.sh core               # Core builtin tests
#   ./test.sh translator         # Translator tests
#   ./test.sh derivation         # Derivation tests
#   ./test.sh import             # Import system tests
#   ./test.sh infra              # Infrastructure tests
#   ./test.sh integration        # nixpkgs integration tests
#   ./test.sh <pattern>          # Run tests matching pattern

case "$1" in
    "")
        echo "Running all tests..."
        deno test --allow-all
        ;;
    types)
        echo "Running type checking tests (Task 1)..."
        deno test --allow-all main/tests/builtins_type_checking_test.js 2>/dev/null || \
            echo "⚠️  File not yet created: main/tests/builtins_type_checking_test.js"
        ;;
    lists)
        echo "Running list operation tests (Task 2)..."
        deno test --allow-all main/tests/builtins_lists_comprehensive_test.js 2>/dev/null || \
            echo "⚠️  File not yet created: main/tests/builtins_lists_comprehensive_test.js"
        ;;
    attrs|attrsets)
        echo "Running attrset tests..."
        deno test --allow-all main/tests/builtins_attrset_ops_test.js
        ;;
    strings)
        echo "Running string operation tests..."
        deno test --allow-all main/tests/builtins_string_ops_test.js
        ;;
    math)
        echo "Running math operation tests..."
        deno test --allow-all main/tests/builtins_math_bitwise_test.js
        ;;
    paths)
        echo "Running path/file tests..."
        deno test --allow-all main/tests/builtins_path_test.js
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
            main/tests/string_interpolation_test.js \
            main/tests/path_interpolation_test.js \
            main/tests/operators_test.js
        ;;
    derivation|drv)
        echo "Running derivation tests..."
        deno test --allow-all main/tests/derivation_standalone_test.js
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
