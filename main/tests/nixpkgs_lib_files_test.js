#!/usr/bin/env deno test --allow-all
/**
 * Test suite for complete nixpkgs.lib files with imports
 *
 * Validates that the translator + import system can handle real nixpkgs.lib
 * files (snapshotted under fixtures/nixpkgs-lib), including their imports.
 * Files are loaded through the real pipeline: builtins.import →
 * loadAndEvaluateSync → translated module evaluation.
 */

import { builtins } from "../runtime.js"
import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { resolve, join } from "https://deno.land/std@0.224.0/path/mod.ts"

const nixpkgsLibPath = resolve(Deno.cwd(), "main/tests/fixtures/nixpkgs-lib/lib")

// Load a fixture lib file; most are functions taking { lib, ... }
const loadLibFile = (filename, args = null) => {
    const value = builtins.import(join(nixpkgsLibPath, filename))
    return args === null ? value : value(args)
}

// Evaluate an inline Nix snippet through the real import pipeline
const evalNix = (nixCode) => {
    const tmpPath = Deno.makeTempFileSync({ suffix: ".nix" })
    try {
        Deno.writeTextFileSync(tmpPath, nixCode)
        return builtins.import(tmpPath)
    } finally {
        Deno.removeSync(tmpPath)
    }
}

Deno.test("nixpkgs.lib file loading", async (t) => {
    await t.step("load ascii-table.nix (no imports, no dependencies)", () => {
        const asciiTable = loadLibFile("ascii-table.nix")

        // Verify it's an attribute set
        assertExists(asciiTable)
        assertEquals(typeof asciiTable, "object")

        // Check some known values
        assertEquals(asciiTable[" "], 32n)
        assertEquals(asciiTable["A"], 65n)
        assertEquals(asciiTable["a"], 97n)
        assertEquals(asciiTable["0"], 48n)

        // Check escape sequences
        assertEquals(asciiTable["\t"], 9n)
        assertEquals(asciiTable["\n"], 10n)
        assertEquals(asciiTable["\r"], 13n)
    })

    await t.step("verify ascii-table structure", () => {
        const asciiTable = loadLibFile("ascii-table.nix")

        // Should have entries for printable ASCII (32-126) plus some control chars
        const keys = Object.keys(asciiTable)
        assertEquals(keys.length >= 96, true, `Expected at least 96 ASCII entries, got ${keys.length}`)

        // Verify all values are BigInts (Nix integers)
        for (const [char, code] of Object.entries(asciiTable)) {
            assertEquals(typeof code, "bigint", `Character '${char}' should have BigInt code`)
            assertEquals(code >= 0n, true, `Character '${char}' should have non-negative code`)
            assertEquals(code <= 127n, true, `Character '${char}' should have ASCII code <= 127`)
        }
    })

    await t.step("test inherit_from syntax (inherit (expr) attrs)", () => {
        const result = evalNix(`let inherit (builtins) add sub; in { x = add 10 20; y = sub 30 5; }`)
        assertEquals(result.x, 30n)
        assertEquals(result.y, 25n)
    })

    await t.step("test inherit_from in attrsets", () => {
        const result = evalNix(`{ inherit (builtins) add sub; }`)

        assertExists(result.add)
        assertExists(result.sub)
        assertEquals(typeof result.add, "function")
        assertEquals(typeof result.sub, "function")

        // Test that the functions work
        assertEquals(result.add(5n)(3n), 8n)
        assertEquals(result.sub(10n)(4n), 6n)
    })

    // strings.nix needs lib.trivial.warnIf (curried, like the real lib.trivial)
    const stringsLib = {
        trivial: {
            warnIf: (cond) => (msg) => (val) => val,
        },
    }

    await t.step("load strings.nix with import (imports ascii-table.nix)", () => {
        const stringsModule = loadLibFile("strings.nix", { lib: stringsLib })

        assertEquals(typeof stringsModule, "object", "strings.nix should return an object")
        assertExists(stringsModule, "strings.nix should return a non-null value")
        assertExists(stringsModule.concatStrings, "strings.nix should have concatStrings")
        assertExists(stringsModule.concatStringsSep, "strings.nix should have concatStringsSep")
    })

    await t.step("test strings.nix concatStrings function", () => {
        const stringsModule = loadLibFile("strings.nix", { lib: stringsLib })
        const result = stringsModule.concatStrings(["hello", " ", "world"])
        assertEquals(result.toString(), "hello world")
    })

    await t.step("load minfeatures.nix (no dependencies)", () => {
        // minfeatures.nix is self-contained: checks Nix version features
        const minfeatures = loadLibFile("minfeatures.nix")

        assertExists(minfeatures)
        assertEquals(typeof minfeatures, "object")

        assertExists(minfeatures.all, "minfeatures should have 'all' property")
        assertExists(minfeatures.supported, "minfeatures should have 'supported' property")
        assertExists(minfeatures.missing, "minfeatures should have 'missing' property")

        assertEquals(Array.isArray(minfeatures.all), true, "'all' should be an array")
        assertEquals(Array.isArray(minfeatures.supported), true, "'supported' should be an array")
        assertEquals(Array.isArray(minfeatures.missing), true, "'missing' should be an array")

        // Our builtins emulate a Nix recent enough to support all listed features
        assertEquals(minfeatures.supported.length, 2, "Should support 2 features")
        assertEquals(minfeatures.missing.length, 0, "Should have 0 missing features")
    })

    await t.step("load source-types.nix (requires lib.mapAttrs)", () => {
        const sourceTypes = loadLibFile("source-types.nix", { lib: { mapAttrs: builtins.mapAttrs } })

        assertExists(sourceTypes)
        assertEquals(typeof sourceTypes, "object")

        // Should have the 4 source types
        assertExists(sourceTypes.fromSource, "Should have fromSource")
        assertExists(sourceTypes.binaryNativeCode, "Should have binaryNativeCode")
        assertExists(sourceTypes.binaryBytecode, "Should have binaryBytecode")
        assertExists(sourceTypes.binaryFirmware, "Should have binaryFirmware")

        assertEquals(sourceTypes.fromSource.shortName.toString(), "fromSource")
        assertEquals(sourceTypes.fromSource.isSource, true)

        assertEquals(sourceTypes.binaryNativeCode.shortName.toString(), "binaryNativeCode")
        assertEquals(sourceTypes.binaryNativeCode.isSource, false)
    })

    await t.step("test versions.nix major/minor/patch functions", () => {
        const versions = loadLibFile("versions.nix", { lib: {} })

        assertExists(versions)
        assertEquals(typeof versions, "object")

        assertExists(versions.major)
        assertEquals(typeof versions.major, "function")
        assertEquals(versions.major("1.2.3").toString(), "1")
        assertEquals(versions.major("10.20.30").toString(), "10")

        assertExists(versions.minor)
        assertEquals(typeof versions.minor, "function")
        assertEquals(versions.minor("1.2.3").toString(), "2")
        assertEquals(versions.minor("10.20.30").toString(), "20")

        assertExists(versions.patch)
        assertEquals(typeof versions.patch, "function")
        assertEquals(versions.patch("1.2.3").toString(), "3")
        assertEquals(versions.patch("10.20.30").toString(), "30")
    })

    await t.step("test kernel.nix configuration helpers", () => {
        // kernel.nix needs lib.mkIf, lib.versionAtLeast, lib.versionOlder (curried)
        const minimalLib = {
            mkIf: (cond) => (val) => (cond ? val : null),
            versionAtLeast: (v1) => (v2) => builtins.compareVersions(v1)(v2) >= 0n,
            versionOlder: (v1) => (v2) => builtins.compareVersions(v1)(v2) < 0n,
        }
        const kernel = loadLibFile("kernel.nix", { lib: minimalLib })

        assertExists(kernel)
        assertEquals(typeof kernel, "object")

        // Test option function
        assertExists(kernel.option)
        assertEquals(typeof kernel.option, "function")
        const opt = kernel.option({ foo: "bar" })
        assertEquals(opt.foo, "bar")
        assertEquals(opt.optional, true)

        // Test kernel state constants
        assertExists(kernel.yes)
        assertEquals(kernel.yes.tristate.toString(), "y")
        assertEquals(kernel.yes.optional, false)

        assertExists(kernel.no)
        assertEquals(kernel.no.tristate.toString(), "n")
        assertEquals(kernel.no.optional, false)

        assertExists(kernel.module)
        assertEquals(kernel.module.tristate.toString(), "m")
        assertEquals(kernel.module.optional, false)

        assertExists(kernel.unset)
        assertEquals(kernel.unset.tristate, null)
        assertEquals(kernel.unset.optional, false)

        // Test freeform function
        assertExists(kernel.freeform)
        assertEquals(typeof kernel.freeform, "function")
        const ff = kernel.freeform("test-value")
        assertEquals(ff.freeform.toString(), "test-value")
        assertEquals(ff.optional, false)

        // Test whenHelpers
        assertExists(kernel.whenHelpers)
        assertEquals(typeof kernel.whenHelpers, "function")
        const helpers = kernel.whenHelpers("5.10.0")
        assertExists(helpers.whenAtLeast)
        assertExists(helpers.whenOlder)
        assertExists(helpers.whenBetween)
    })

    await t.step("load flakes.nix (simple re-export of builtins)", () => {
        const flakes = loadLibFile("flakes.nix", { lib: {} })

        assertExists(flakes)
        assertEquals(typeof flakes, "object")

        assertExists(flakes.parseFlakeRef, "flakes should have parseFlakeRef")
        assertExists(flakes.flakeRefToString, "flakes should have flakeRefToString")
        assertEquals(typeof flakes.parseFlakeRef, "function")
        assertEquals(typeof flakes.flakeRefToString, "function")

        // Verify they're actually the builtins functions
        assertEquals(flakes.parseFlakeRef, builtins.parseFlakeRef)
        assertEquals(flakes.flakeRefToString, builtins.flakeRefToString)
    })

    await t.step("load flake-version-info.nix (lib overlay for version info)", () => {
        // flake-version-info.nix is a curried function: self: finalLib: prevLib: { ... }
        const overlayFactory = loadLibFile("flake-version-info.nix")

        const mockFlakeSelf = {
            lastModifiedDate: "20260205123456",
            shortRev: "abc1234",
            rev: "abc1234567890abcdef1234567890abcdef123456",
        }
        const mockPrevLib = {
            trivial: {
                version: "1.0.0",
            },
        }
        const mockFinalLib = {
            substring: builtins.substring,
        }

        const overlay = overlayFactory(mockFlakeSelf)(mockFinalLib)(mockPrevLib)

        assertExists(overlay)
        assertEquals(typeof overlay, "object")
        assertExists(overlay.trivial, "overlay should have trivial")

        // Check versionSuffix format: ".YYYYMMDD.shortRev"
        assertExists(overlay.trivial.versionSuffix)
        assertEquals(overlay.trivial.versionSuffix.toString(), ".20260205.abc1234")

        // Check revisionWithDefault
        assertExists(overlay.trivial.revisionWithDefault)
        assertEquals(typeof overlay.trivial.revisionWithDefault, "function")
        assertEquals(
            overlay.trivial.revisionWithDefault("fallback").toString(),
            "abc1234567890abcdef1234567890abcdef123456"
        )

        // With missing rev, revisionWithDefault should use the default
        const mockFlakeSelfNoRev = {
            lastModifiedDate: "19700101000000",
            shortRev: "dirty",
        }
        const overlay2 = overlayFactory(mockFlakeSelfNoRev)(mockFinalLib)(mockPrevLib)
        assertEquals(overlay2.trivial.versionSuffix.toString(), ".19700101.dirty")
        assertEquals(overlay2.trivial.revisionWithDefault("my-default").toString(), "my-default")
    })

    await t.step("load systems/flake-systems.nix (simple list of platforms)", () => {
        const systems = loadLibFile("systems/flake-systems.nix", {})

        assertExists(systems)
        assertEquals(Array.isArray(systems), true, "flake-systems.nix should return a list")

        const names = systems.map((s) => s.toString())
        assertEquals(names.includes("x86_64-linux"), true, "Should include x86_64-linux")
        assertEquals(names.includes("aarch64-linux"), true, "Should include aarch64-linux")
        assertEquals(names.includes("x86_64-darwin"), true, "Should include x86_64-darwin")
        assertEquals(names.includes("aarch64-darwin"), true, "Should include aarch64-darwin")

        assertEquals(names.length >= 7, true, `Expected at least 7 platforms, got ${names.length}`)
    })

    await t.step("load systems/supported.nix (rec attrset with platform tiers)", () => {
        // supported.nix is a rec attrset that organizes platforms by tier
        const supported = loadLibFile("systems/supported.nix", { lib: {} })

        assertExists(supported)
        assertEquals(typeof supported, "object")

        assertExists(supported.tier1, "Should have tier1")
        assertEquals(Array.isArray(supported.tier1), true, "tier1 should be a list")
        assertEquals(supported.tier1.includes("x86_64-linux"), true, "tier1 should include x86_64-linux")

        assertExists(supported.tier2, "Should have tier2")
        assertEquals(Array.isArray(supported.tier2), true, "tier2 should be a list")
        assertEquals(supported.tier2.includes("aarch64-linux"), true, "tier2 should include aarch64-linux")
        assertEquals(supported.tier2.includes("x86_64-darwin"), true, "tier2 should include x86_64-darwin")

        assertExists(supported.tier3, "Should have tier3")
        assertEquals(Array.isArray(supported.tier3), true, "tier3 should be a list")
        assertEquals(supported.tier3.includes("armv6l-linux"), true, "tier3 should include armv6l-linux")

        // hydra = tier1 ++ tier2 ++ tier3 ++ ["aarch64-darwin"] (rec evaluation)
        assertExists(supported.hydra, "Should have hydra")
        assertEquals(Array.isArray(supported.hydra), true, "hydra should be a list")
        assertEquals(supported.hydra.includes("x86_64-linux"), true, "hydra should include tier1 platforms")
        assertEquals(supported.hydra.includes("aarch64-linux"), true, "hydra should include tier2 platforms")
        assertEquals(supported.hydra.includes("armv6l-linux"), true, "hydra should include tier3 platforms")
        assertEquals(supported.hydra.includes("aarch64-darwin"), true, "hydra should include aarch64-darwin")

        const expectedHydraLength = supported.tier1.length + supported.tier2.length + supported.tier3.length + 1
        assertEquals(supported.hydra.length, expectedHydraLength, "hydra length should match tier1 + tier2 + tier3 + 1")
    })

    await t.step("load licenses.nix (pure data, no complex dependencies)", () => {
        const licenses = loadLibFile("licenses.nix", {
            lib: {
                mapAttrs: builtins.mapAttrs,
                optionalAttrs: builtins.optionalAttrs,
            },
        })

        assertExists(licenses)
        assertEquals(typeof licenses, "object")

        // Check common licenses
        assertExists(licenses.mit, "Should have MIT license")
        assertEquals(licenses.mit.spdxId.toString(), "MIT")
        assertEquals(licenses.mit.free, true)
        assertExists(licenses.mit.fullName)
        assertExists(licenses.mit.url)
        assertEquals(licenses.mit.url.toString().includes("spdx.org"), true)

        assertExists(licenses.gpl3, "Should have GPL3 license")
        assertEquals(licenses.gpl3.spdxId.toString(), "GPL-3.0")
        assertEquals(licenses.gpl3.free, true)

        assertExists(licenses.bsd3, "Should have BSD3 license")
        assertEquals(licenses.bsd3.spdxId.toString(), "BSD-3-Clause")
        assertEquals(licenses.bsd3.free, true)

        assertExists(licenses.asl20, "Should have Apache 2.0 license")
        assertEquals(licenses.asl20.spdxId.toString(), "Apache-2.0")
        assertEquals(licenses.asl20.free, true)

        assertExists(licenses.mpl20, "Should have MPL 2.0 license")
        assertEquals(licenses.mpl20.spdxId.toString(), "MPL-2.0")
        assertEquals(licenses.mpl20.free, true)

        const licenseCount = Object.keys(licenses).length
        assertEquals(licenseCount >= 150, true, `Expected at least 150 licenses, got ${licenseCount}`)
    })

    await t.step("test interpolation in attrpath (obj.${expr})", () => {
        const result = evalNix(`let h = { name = "foo"; }; obj = { foo = "bar"; }; in obj.\${h.name}`)
        assertEquals(result.toString(), "bar")
    })
})
