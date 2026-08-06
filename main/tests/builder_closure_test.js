#!/usr/bin/env deno run --allow-all
/**
 * Build-graph tests for the builder: a derivation that depends on another
 * derivation must realize the dependency first, and references to the
 * dependency's /nix/store output path must be rewritten into the relocatable
 * store so the dependent builder can actually read them.
 */

import { createRuntime, builtins } from "../runtime.js"
import { build } from "../builder.js"
import { assert, assertStringIncludes } from "https://deno.land/std@0.224.0/assert/mod.ts"

const currentSystem = () =>
    typeof builtins.currentSystem === "function"
        ? builtins.currentSystem()
        : String(builtins.currentSystem)

Deno.test("builder realizes a two-derivation closure", async () => {
    const storeRoot = await Deno.makeTempDir({ prefix: "denix_closure_test_" })
    Deno.env.set("DENIX_STORE_ROOT", storeRoot)
    createRuntime() // initialize globalImportState / runtime

    const system = currentSystem()

    // PATH declared explicitly: the builder no longer inherits the host PATH.
    const HOST_PATH = "/usr/bin:/bin"
    const dep = builtins.derivation({
        name: "closure-dep",
        system,
        builder: "/bin/sh",
        PATH: HOST_PATH,
        args: ["-c", "echo 'hi-from-dep' > $out"],
    })

    // `dep` appears as a plain attribute → it becomes env var `dep` (the
    // dependency's output path) and is collected as a build dependency.
    const parent = builtins.derivation({
        name: "closure-parent",
        system,
        builder: "/bin/sh",
        PATH: HOST_PATH,
        dep,
        args: ["-c", 'cat "$dep" > $out; echo "plus-parent" >> $out'],
    })

    // Sanity: parent recorded dep as a dependency to realize first.
    assert(
        parent.inputDrvObjects.some((d) => d.drv.drvPath === dep.drvPath),
        "parent should depend on dep",
    )

    const result = await build(parent)
    const outFile = result.outputPaths.out
    const content = await Deno.readTextFile(outFile)

    assertStringIncludes(content, "hi-from-dep")
    assertStringIncludes(content, "plus-parent")

    // The dependency must have been materialized in the relocatable store.
    const depBase = dep.outPath.split("/").pop()
    await Deno.stat(`${storeRoot}/${depBase}`) // throws if missing

    await Deno.remove(storeRoot, { recursive: true })
})
