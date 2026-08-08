#!/usr/bin/env deno run --allow-all
/**
 * Fixed-output derivations: path fidelity (vs real Nix) + build-time hash
 * verification. Expected store paths captured from `nix eval` on this machine.
 */

import { createRuntime, builtins } from "../runtime.js"
import { build } from "../builder.js"
import { assertEquals, assertRejects } from "https://deno.land/std@0.224.0/assert/mod.ts"

createRuntime()

// SRI for sha256("hello") (no newline)
const HELLO_SRI = "sha256-LPJNul+wow4m6DsqxbninhsWHlwfp0JecwQzYpOLmCQ="

Deno.test("flat fixed-output drvPath + outPath match Nix", () => {
    const d = builtins.derivation({
        name: "fixed-1", system: "x86_64-linux", builder: "/bin/sh",
        args: ["-c", "echo hello > $out"],
        outputHashMode: "flat", outputHashAlgo: "sha256", outputHash: HELLO_SRI,
    })
    assertEquals(d.drvPath, "/nix/store/9p7bd4vx6hinwx9p5dby1ccwclmk5d55-fixed-1.drv")
    assertEquals(d.outPath, "/nix/store/ivpms22wl9m5nz2sdg5gixnzlw9r3jl9-fixed-1")
})

Deno.test("recursive fixed-output drvPath + outPath match Nix", () => {
    const d = builtins.derivation({
        name: "fixed-2", system: "x86_64-linux", builder: "/bin/sh",
        args: ["-c", "mkdir $out"],
        outputHashMode: "recursive", outputHashAlgo: "sha256", outputHash: HELLO_SRI,
    })
    assertEquals(d.drvPath, "/nix/store/ji53gigzzd0h0da8xv9jcgjaww9gq1jk-fixed-2.drv")
    assertEquals(d.outPath, "/nix/store/cpf4wg054yc2gxqj2lgp85539z3zp5x2-fixed-2")
})

// DENIX_STORE_ROOT is process-wide; restore it so later test files don't
// compute store paths under a (deleted) temp dir.
const withStoreRoot = async (prefix, fn) => {
    const storeRoot = await Deno.makeTempDir({ prefix })
    const prevRoot = Deno.env.get("DENIX_STORE_ROOT")
    Deno.env.set("DENIX_STORE_ROOT", storeRoot)
    try {
        await fn()
    } finally {
        prevRoot === undefined ? Deno.env.delete("DENIX_STORE_ROOT") : Deno.env.set("DENIX_STORE_ROOT", prevRoot)
        await Deno.remove(storeRoot, { recursive: true })
    }
}

Deno.test("fixed-output build verifies matching hash", () => withStoreRoot("denix_fo_ok_", async () => {
    const d = builtins.derivation({
        name: "fo-ok", system: builtins.currentSystem, builder: "/bin/sh",
        args: ["-c", "printf hello > $out"], // no newline → matches HELLO_SRI
        outputHashMode: "flat", outputHashAlgo: "sha256", outputHash: HELLO_SRI,
    })
    const result = await build(d)
    assertEquals(await Deno.readTextFile(result.outputPaths.out), "hello")
}))

Deno.test("fixed-output build rejects on hash mismatch", () => withStoreRoot("denix_fo_bad_", async () => {
    const d = builtins.derivation({
        name: "fo-bad", system: builtins.currentSystem, builder: "/bin/sh",
        args: ["-c", "printf WRONG > $out"],
        outputHashMode: "flat", outputHashAlgo: "sha256", outputHash: HELLO_SRI,
    })
    await assertRejects(() => build(d), Error, "hash mismatch")
}))
