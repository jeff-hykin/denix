#!/usr/bin/env bash
# Simple test runner for denix
#
# Usage:
#   ./test.sh              # Run all tests
#   ./test.sh derivation   # Run tests matching "derivation"
#   ./test.sh builtins     # Run builtins tests
#   ./test.sh translator   # Run translator tests

if [ -z "$1" ]; then
    echo "Running all tests..."
    deno test --allow-all
else
    echo "Running tests matching: $1"
    deno test --allow-all --filter="$1"
fi
