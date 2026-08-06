#!/usr/bin/env deno run --allow-all
/**
 * Multi-output derivations + non-default output references.
 * Each output (`pkg.out`, `pkg.dev`) is its own derivation value tagged with
 * outputName; referencing a non-default output records THAT output in inputDrvs.
 * Expected store paths captured from real `nix eval`.
 */

import { createRuntime, builtins, InterpolatedString } from "../runtime.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

createRuntime()

const SYSTEM = "x86_64-linux"
const drv = (attrs) => builtins.derivation({ system: SYSTEM, builder: "/bin/sh", ...attrs })
const interp = (pre, ref, post) => new InterpolatedString([pre, post], [() => ref])

const multi = () => drv({
    name: "multi", outputs: ["out", "dev"],
    args: ["-c", "echo a > $out; echo b > $dev"],
})

Deno.test("multi-output derivation: each output is a derivation value", () => {
    const m = multi()
    assertEquals(m.type, "derivation")
    assertEquals(m.outputName, "out")        // base == default output
    assertEquals(m.dev.type, "derivation")
    assertEquals(m.dev.outputName, "dev")
    assertEquals(m.out.outPath, m.outPath)   // base.out === base
    assertEquals(m.dev.dev.outPath, m.dev.outPath) // cross-linked
})

Deno.test("multi-output paths byte-match Nix", () => {
    const m = multi()
    assertEquals(m.drvPath, "/nix/store/m3bf0qz25bm693jyc2cdib6xvygphbbd-multi.drv")
    assertEquals(m.outPath, "/nix/store/qlh1vqayw7v5phkz84hc3j9mq10y22kj-multi")
    assertEquals(m.dev.outPath, "/nix/store/4j9k8vj5ivd8vxbfmjhqqhg86vhbx755-multi-dev")
})

Deno.test("non-default output reference (dep.dev) drvPath matches Nix", () => {
    const dep = multi()
    const usesDev = drv({ name: "uses-dev", args: ["-c", interp("cat ", dep.dev, " > $out")] })
    assertEquals(usesDev.drvPath, "/nix/store/m9a5mcjds50cr6sckz8577r7v417b585-uses-dev.drv")
})

Deno.test("referencing both out and dev of one dep matches Nix", () => {
    const dep = multi()
    const arg = new InterpolatedString(["cat ", " ", " > $out"], [() => dep.out, () => dep.dev])
    const usesBoth = drv({ name: "uses-both", args: ["-c", arg] })
    assertEquals(usesBoth.drvPath, "/nix/store/4kkwvs0ypy89535zmvxq9mmcsd82bypn-uses-both.drv")
})
