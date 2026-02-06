#!/usr/bin/env -S deno run --allow-all
// Standalone derivation tests - Test store path computation without full runtime

import { serializeDerivation, computeDrvPath, computeOutputPath } from "/Users/jeffhykin/repos/denix/tools/store_path.js"

console.log("Testing Derivation Store Path Computation\n")

let passed = 0
let failed = 0

function test(name, actual, expected) {
    if (actual === expected) {
        console.log(`✓ ${name}`)
        passed++
    } else {
        console.log(`✗ ${name}`)
        console.log(`  Expected: ${expected}`)
        console.log(`  Got:      ${actual}`)
        failed++
    }
}

// Test 1: Basic derivation with no inputs
{
    const drv = {
        outputs: [["out", "", "", ""]],
        inputDrvs: [],
        inputSrcs: [],
        system: "x86_64-linux",
        builder: "/bin/sh",
        args: [],
        env: {
            builder: "/bin/sh",
            name: "test",
            out: "",
            system: "x86_64-linux"
        }
    }

    const emptySerial = serializeDerivation(drv)
    const outPath = computeOutputPath(emptySerial, "out", "test")
    
    drv.outputs = [["out", outPath, "", ""]]
    drv.env.out = outPath
    const filledSerial = serializeDerivation(drv)
    const drvPath = computeDrvPath(filledSerial, "test")

    test("Basic derivation - outPath", outPath, "/nix/store/d62izaahds46siwr2b7k7q3gan6vw4p0-test")
    test("Basic derivation - drvPath", drvPath, "/nix/store/y1s2fiq89v2h9vkb38w508ir20dwv6v2-test.drv")
}

// Test 2: Derivation with args
{
    const drv = {
        outputs: [["out", "", "", ""]],
        inputDrvs: [],
        inputSrcs: [],
        system: "x86_64-linux",
        builder: "/bin/sh",
        args: ["-c", "echo hello"],
        env: {
            builder: "/bin/sh",
            name: "test-args",
            out: "",
            system: "x86_64-linux"
        }
    }

    const emptySerial = serializeDerivation(drv)
    const outPath = computeOutputPath(emptySerial, "out", "test-args")
    
    drv.outputs = [["out", outPath, "", ""]]
    drv.env.out = outPath
    const filledSerial = serializeDerivation(drv)
    const drvPath = computeDrvPath(filledSerial, "test-args")

    test("Derivation with args - outPath computed", !!outPath.startsWith("/nix/store/"), true)
    test("Derivation with args - drvPath computed", !!drvPath.startsWith("/nix/store/"), true)
    test("Derivation with args - outPath ends with name", outPath.endsWith("-test-args"), true)
    test("Derivation with args - drvPath ends with .drv", drvPath.endsWith(".drv"), true)
}

// Test 3: Derivation with multiple outputs
{
    const drv = {
        outputs: [["out", "", "", ""], ["dev", "", "", ""]],
        inputDrvs: [],
        inputSrcs: [],
        system: "x86_64-linux",
        builder: "/bin/sh",
        args: [],
        env: {
            builder: "/bin/sh",
            name: "multi-output",
            out: "",
            dev: "",
            system: "x86_64-linux"
        }
    }

    const emptySerial = serializeDerivation(drv)
    const outPath = computeOutputPath(emptySerial, "out", "multi-output")
    const devPath = computeOutputPath(emptySerial, "dev", "multi-output")
    
    test("Multiple outputs - out and dev are different", outPath !== devPath, true)
    test("Multiple outputs - both have store paths", 
         outPath.startsWith("/nix/store/") && devPath.startsWith("/nix/store/"), true)
}

// Test 4: ATerm serialization format
{
    const drv = {
        outputs: [["out", "/nix/store/test", "", ""]],
        inputDrvs: [],
        inputSrcs: [],
        system: "x86_64-linux",
        builder: "/bin/sh",
        args: ["a", "b"],
        env: {
            key: "value"
        }
    }

    const serialized = serializeDerivation(drv)
    test("Serialization starts with Derive", serialized.startsWith("Derive("), true)
    test("Serialization contains outputs", serialized.includes('("out","/nix/store/test","","")'), true)
    test("Serialization contains args", serialized.includes('["a","b"]'), true)
    test("Serialization contains env", serialized.includes('("key","value")'), true)
}

console.log("\n" + "=".repeat(60))
console.log(`Total: ${passed + failed} tests`)
console.log(`✓ Passed: ${passed}`)
console.log(`✗ Failed: ${failed}`)
console.log("=".repeat(60))

if (failed > 0) {
    Deno.exit(1)
}
