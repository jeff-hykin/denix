#!/usr/bin/env -S deno run --allow-all
// Standalone derivation tests - Test store path computation without full runtime

import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts"
import { serializeDerivation, computeDrvPath, computeOutputPath } from "../../../tools/store_path.js"

Deno.test("derivation - basic with no inputs", () => {
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

    assertEquals(outPath, "/nix/store/d62izaahds46siwr2b7k7q3gan6vw4p0-test")
    assertEquals(drvPath, "/nix/store/y1s2fiq89v2h9vkb38w508ir20dwv6v2-test.drv")
})

Deno.test("derivation - with arguments", () => {
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

    assertEquals(outPath.startsWith("/nix/store/"), true)
    assertEquals(drvPath.startsWith("/nix/store/"), true)
    assertEquals(outPath.endsWith("-test-args"), true)
    assertEquals(drvPath.endsWith(".drv"), true)
})

Deno.test("derivation - multiple outputs", () => {
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

    // Different outputs should have different paths
    assertEquals(outPath !== devPath, true)
    assertEquals(outPath.startsWith("/nix/store/"), true)
    assertEquals(devPath.startsWith("/nix/store/"), true)
})

Deno.test("derivation - ATerm serialization format", () => {
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
    assertEquals(serialized.startsWith("Derive("), true)
    assertEquals(serialized.includes('("out","/nix/store/test","","")'), true)
    assertEquals(serialized.includes('["a","b"]'), true)
    assertEquals(serialized.includes('("key","value")'), true)
})
