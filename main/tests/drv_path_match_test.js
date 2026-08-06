#!/usr/bin/env deno run --allow-all
/**
 * Derivation path fidelity: denix's computed drvPath and output paths must
 * byte-match real Nix. The expected store paths below were captured from a
 * real `nix eval` (Nix 2.x) on this machine — see memory denix-real-nix-available.
 *
 * Covers: a leaf derivation, a derivation with one input (exercises
 * hashDerivationModulo: masked vs unmasked modulo hashes + reference-aware
 * .drv text hashing), a 3-level chain, and a diamond (shared dependency).
 */

import { createRuntime, builtins, InterpolatedString } from "../runtime.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

createRuntime()

const SYSTEM = "x86_64-linux"
const drv = (attrs) => builtins.derivation({ system: SYSTEM, builder: "/bin/sh", ...attrs })
// Build an interpolated "<pre>${ref}<post>" string that references a derivation.
const interp = (pre, ref, post) => new InterpolatedString([pre, post], [() => ref])

Deno.test("leaf derivation drvPath + outPath match Nix", () => {
    const d = drv({ name: "simple-1", args: ["-c", "echo hi > $out"] })
    assertEquals(d.drvPath, "/nix/store/90fz4ilw369k6ym0whzh42z1zbzi579c-simple-1.drv")
    assertEquals(d.outPath, "/nix/store/43dqa734nw2w6apnz40ii1lh73df3pr9-simple-1")
})

Deno.test("derivation with one input matches Nix", () => {
    const dep = drv({ name: "dep-1", args: ["-c", "echo hi > $out"] })
    assertEquals(dep.drvPath, "/nix/store/560jgmigr0vzl70m41yrgflylbxznxx4-dep-1.drv")
    assertEquals(dep.outPath, "/nix/store/han5897vrk0cgmzsakm0pr7jj2z07kmh-dep-1")

    const parent = drv({ name: "parent-1", args: ["-c", interp("cat ", dep, " > $out")] })
    assertEquals(parent.drvPath, "/nix/store/pfdppv42src8mmd29qaxx9dqhi4dmwq1-parent-1.drv")
    assertEquals(parent.outPath, "/nix/store/dk7wfs5r614pn4v6qr29pas213fx1vai-parent-1")
})

Deno.test("3-level chain drvPath matches Nix", () => {
    const a = drv({ name: "a", args: ["-c", "echo a > $out"] })
    const b = drv({ name: "b", args: ["-c", interp("cat ", a, " > $out")] })
    const c = drv({ name: "c", args: ["-c", interp("cat ", b, " > $out")] })
    assertEquals(c.drvPath, "/nix/store/cd0314q7x90ygss9qvv21ri05qv2yrwp-c.drv")
})

Deno.test("diamond (shared dependency) drvPath matches Nix", () => {
    const a = drv({ name: "a", args: ["-c", "echo a > $out"] })
    const l = drv({ name: "l", args: ["-c", interp("cat ", a, "; echo l > $out")] })
    const r = drv({ name: "r", args: ["-c", interp("cat ", a, "; echo r > $out")] })
    // d references both l and r
    const dArg = new InterpolatedString(["cat ", " ", " > $out"], [() => l, () => r])
    const d = drv({ name: "d", args: ["-c", dArg] })
    assertEquals(d.drvPath, "/nix/store/9hy0d94y69ny3jc80lkzd3bpm8khw486-d.drv")
})
