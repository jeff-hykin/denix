#!/usr/bin/env -S deno run --allow-all
// Basic derivation tests - simplest possible cases

import { testDerivation, printSummary } from "./test_harness.js"

console.log("Running Basic Derivation Tests (001-010)\n")

// Test 001: Simplest possible derivation - just required fields
await testDerivation(
    1,
    "Minimal derivation with required fields only",
    `builtins.toJSON (derivation {
        name = "test";
        system = "x86_64-linux";
        builder = "/bin/sh";
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test",
        system: "x86_64-linux",
        builder: "/bin/sh"
    }))`
)

// Test 002: Derivation with args
await testDerivation(
    2,
    "Derivation with builder args",
    `builtins.toJSON (derivation {
        name = "test-with-args";
        system = "x86_64-linux";
        builder = "/bin/sh";
        args = ["-c" "echo hello"];
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test-with-args",
        system: "x86_64-linux",
        builder: "/bin/sh",
        args: ["-c", "echo hello"]
    }))`
)

// Test 003: Derivation with outputs specified
await testDerivation(
    3,
    "Derivation with explicit outputs",
    `builtins.toJSON (derivation {
        name = "test-outputs";
        system = "x86_64-linux";
        builder = "/bin/sh";
        outputs = ["out" "dev"];
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test-outputs",
        system: "x86_64-linux",
        builder: "/bin/sh",
        outputs: ["out", "dev"]
    }))`
)

// Test 004: Derivation with string environment variables
await testDerivation(
    4,
    "Derivation with string env vars",
    `builtins.toJSON (derivation {
        name = "test-env";
        system = "x86_64-linux";
        builder = "/bin/sh";
        MY_VAR = "hello";
        ANOTHER_VAR = "world";
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test-env",
        system: "x86_64-linux",
        builder: "/bin/sh",
        MY_VAR: "hello",
        ANOTHER_VAR: "world"
    }))`
)

// Test 005: Derivation with number environment variable
await testDerivation(
    5,
    "Derivation with number env var",
    `builtins.toJSON (derivation {
        name = "test-num";
        system = "x86_64-linux";
        builder = "/bin/sh";
        PORT = 8080;
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test-num",
        system: "x86_64-linux",
        builder: "/bin/sh",
        PORT: 8080n
    }))`
)

// Test 006: Derivation with boolean environment variables
await testDerivation(
    6,
    "Derivation with boolean env vars",
    `builtins.toJSON (derivation {
        name = "test-bool";
        system = "x86_64-linux";
        builder = "/bin/sh";
        ENABLED = true;
        DISABLED = false;
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test-bool",
        system: "x86_64-linux",
        builder: "/bin/sh",
        ENABLED: true,
        DISABLED: false
    }))`
)

// Test 007: Derivation with null environment variable
await testDerivation(
    7,
    "Derivation with null env var",
    `builtins.toJSON (derivation {
        name = "test-null";
        system = "x86_64-linux";
        builder = "/bin/sh";
        NULL_VAR = null;
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test-null",
        system: "x86_64-linux",
        builder: "/bin/sh",
        NULL_VAR: null
    }))`
)

// Test 008: Derivation with list environment variable
await testDerivation(
    8,
    "Derivation with list env var (space-separated)",
    `builtins.toJSON (derivation {
        name = "test-list";
        system = "x86_64-linux";
        builder = "/bin/sh";
        FLAGS = ["--enable-feature" "--disable-other"];
    })`,
    `const result = builtins.toJSON(builtins.derivation({
        name: "test-list",
        system: "x86_64-linux",
        builder: "/bin/sh",
        FLAGS: ["--enable-feature", "--disable-other"]
    }))`
)

// Test 009: Check derivation return value has expected fields
await testDerivation(
    9,
    "Derivation return value structure",
    `let drv = derivation {
        name = "test-return";
        system = "x86_64-linux";
        builder = "/bin/sh";
    }; in builtins.toJSON {
        hasName = builtins.hasAttr "name" drv;
        hasOutPath = builtins.hasAttr "outPath" drv;
        hasDrvPath = builtins.hasAttr "drvPath" drv;
        hasType = builtins.hasAttr "type" drv;
        typeValue = drv.type;
    }`,
    `const drv = builtins.derivation({
        name: "test-return",
        system: "x86_64-linux",
        builder: "/bin/sh"
    });
    const result = builtins.toJSON({
        hasName: builtins.hasAttr({name: "name"}, drv),
        hasOutPath: builtins.hasAttr({name: "outPath"}, drv),
        hasDrvPath: builtins.hasAttr({name: "drvPath"}, drv),
        hasType: builtins.hasAttr({name: "type"}, drv),
        typeValue: drv.type
    })`
)

// Test 010: Derivation name appears in output path
await testDerivation(
    10,
    "Derivation name in output path",
    `let drv = derivation {
        name = "mypackage";
        system = "x86_64-linux";
        builder = "/bin/sh";
    }; in builtins.toJSON {
        outPathContainsName = builtins.match ".*mypackage.*" drv.outPath != null;
    }`,
    `const drv = builtins.derivation({
        name: "mypackage",
        system: "x86_64-linux",
        builder: "/bin/sh"
    });
    const result = builtins.toJSON({
        outPathContainsName: builtins.match(".*mypackage.*", drv.outPath) != null
    })`
)

printSummary()
