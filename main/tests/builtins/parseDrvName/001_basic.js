#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../main/runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.parseDrvName - Basic tests\n")

// Test 1: Standard package name-version format
await test(
    1,
    "standard name-version",
    'builtins.parseDrvName "nix-1.0"',
    builtins.parseDrvName("nix-1.0")
)

// Test 2: Pre-release version
await test(
    2,
    "pre-release version",
    'builtins.parseDrvName "nix-0.12pre12876"',
    builtins.parseDrvName("nix-0.12pre12876")
)

// Test 3: No version
await test(
    3,
    "no version",
    'builtins.parseDrvName "hello"',
    builtins.parseDrvName("hello")
)

// Test 4: Multiple hyphens in name
await test(
    4,
    "multiple hyphens in name",
    'builtins.parseDrvName "systemd-journal-gateway-2.34"',
    builtins.parseDrvName("systemd-journal-gateway-2.34")
)

// Test 5: Complex version string
await test(
    5,
    "complex version",
    'builtins.parseDrvName "gcc-11.3.0"',
    builtins.parseDrvName("gcc-11.3.0")
)

// Test 6: Version with letters
await test(
    6,
    "version with letters",
    'builtins.parseDrvName "linux-5.15.0-rc1"',
    builtins.parseDrvName("linux-5.15.0-rc1")
)

// Test 7: Name ending with number
await test(
    7,
    "name ending with number",
    'builtins.parseDrvName "python3-3.11.0"',
    builtins.parseDrvName("python3-3.11.0")
)

printSummary()
