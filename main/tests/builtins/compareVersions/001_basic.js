#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.compareVersions - Basic tests\n")

// Test 1: Simple ascending
await test(
    1,
    "1.0 < 2.0",
    'builtins.compareVersions "1.0" "2.0"',
    builtins.compareVersions("1.0")("2.0")
)

// Test 2: Simple descending
await test(
    2,
    "2.0 > 1.0",
    'builtins.compareVersions "2.0" "1.0"',
    builtins.compareVersions("2.0")("1.0")
)

// Test 3: Equal versions
await test(
    3,
    "1.0 == 1.0",
    'builtins.compareVersions "1.0" "1.0"',
    builtins.compareVersions("1.0")("1.0")
)

// Test 4: Different lengths
await test(
    4,
    "1.2 < 1.2.3",
    'builtins.compareVersions "1.2" "1.2.3"',
    builtins.compareVersions("1.2")("1.2.3")
)

// Test 5: Major version difference
await test(
    5,
    "1.9.9 < 2.0.0",
    'builtins.compareVersions "1.9.9" "2.0.0"',
    builtins.compareVersions("1.9.9")("2.0.0")
)

// Test 6: Pre-release versions
await test(
    6,
    "1.0pre < 1.0",
    'builtins.compareVersions "1.0pre" "1.0"',
    builtins.compareVersions("1.0pre")("1.0")
)

// Test 7: Alpha vs numeric
await test(
    7,
    "1.0a < 1.0b",
    'builtins.compareVersions "1.0a" "1.0b"',
    builtins.compareVersions("1.0a")("1.0b")
)

// Test 8: Empty version
await test(
    8,
    "empty vs 1.0",
    'builtins.compareVersions "" "1.0"',
    builtins.compareVersions("")("1.0")
)

printSummary()
