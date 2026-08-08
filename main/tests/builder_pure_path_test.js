#!/usr/bin/env deno run --allow-all
/**
 * The builder must NOT leak the host PATH. Tools come from a derivation's
 * dependencies (PATH set to a dependency's bin), and a build that relies on a
 * host tool without providing it must fail.
 */

import { createRuntime, builtins, InterpolatedString } from "../runtime.js"
import { build } from "../builder.js"
import { assertEquals, assertRejects } from "https://deno.land/std@0.224.0/assert/mod.ts"

createRuntime()

const system = typeof builtins.currentSystem === "function"
    ? builtins.currentSystem()
    : String(builtins.currentSystem)

// DENIX_STORE_ROOT is process-wide: leaking it poisons later test files (their
// store paths — and even persisted cache.json entries — end up under a
// long-gone temp dir). Always restore the previous value.
const restoreEnv = (name, prev) =>
    prev === undefined ? Deno.env.delete(name) : Deno.env.set(name, prev)

Deno.test("consumer resolves a tool from its dependency's bin (not host PATH)", async () => {
    const storeRoot = await Deno.makeTempDir({ prefix: "denix_pure_ok_" })
    const prevRoot = Deno.env.get("DENIX_STORE_ROOT")
    const prevHostPath = Deno.env.get("DENIX_IMPURE_HOST_PATH")
    Deno.env.set("DENIX_STORE_ROOT", storeRoot)
    Deno.env.delete("DENIX_IMPURE_HOST_PATH")

    try {
        // Impure bootstrap dep: provides $out/bin/mytool (declares its own PATH).
        const stdenvLite = builtins.derivation({
            name: "stdenv-lite-t",
            system,
            builder: "/bin/sh",
            PATH: "/usr/bin:/bin",
            args: ["-c",
                "mkdir -p $out/bin; " +
                "printf '#!/bin/sh\\necho TOOL-OK\\n' > $out/bin/mytool; " +
                "chmod +x $out/bin/mytool"],
        })

        // Pure consumer: PATH is ONLY the dependency's bin (no host paths).
        const consumer = builtins.derivation({
            name: "consumer-t",
            system,
            builder: "/bin/sh",
            PATH: new InterpolatedString(["", "/bin"], [() => stdenvLite]),
            args: ["-c", "mytool > $out"],
        })

        const result = await build(consumer)
        assertEquals(await Deno.readTextFile(result.outputPaths.out), "TOOL-OK\n")
    } finally {
        restoreEnv("DENIX_STORE_ROOT", prevRoot)
        restoreEnv("DENIX_IMPURE_HOST_PATH", prevHostPath)
        await Deno.remove(storeRoot, { recursive: true })
    }
})

Deno.test("pure build relying on a host tool fails (no PATH leak)", async () => {
    const storeRoot = await Deno.makeTempDir({ prefix: "denix_pure_leak_" })
    const prevRoot = Deno.env.get("DENIX_STORE_ROOT")
    const prevHostPath = Deno.env.get("DENIX_IMPURE_HOST_PATH")
    Deno.env.set("DENIX_STORE_ROOT", storeRoot)
    Deno.env.delete("DENIX_IMPURE_HOST_PATH")

    try {
        // No PATH provided and 'cat' is a host tool → must not resolve.
        const needsCat = builtins.derivation({
            name: "needs-cat-t",
            system,
            builder: "/bin/sh",
            args: ["-c", "cat /etc/hostname > $out"],
        })

        await assertRejects(() => build(needsCat), Error)
    } finally {
        restoreEnv("DENIX_STORE_ROOT", prevRoot)
        restoreEnv("DENIX_IMPURE_HOST_PATH", prevHostPath)
        await Deno.remove(storeRoot, { recursive: true })
    }
})
