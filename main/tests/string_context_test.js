#!/usr/bin/env deno run --allow-all
/**
 * String context (partial, structural). denix recovers a string's context — the
 * derivation outputs it references — while the value still holds the references
 * (a derivation-output object, or an InterpolatedString over one). Verified
 * against real `nix` for the getContext shape.
 *
 * Limitation: once a value is flattened to a plain JS string the references are
 * gone, so context is not recoverable from arbitrary plain strings. See
 * docs/design-outputs-context-flakes.md.
 */

import { createRuntime, builtins, InterpolatedString } from "../runtime.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

createRuntime()

const drv = (attrs) => builtins.derivation({ system: "x86_64-linux", builder: "/bin/sh", ...attrs })
// "<pre>${ref}<post>" as an InterpolatedString over `ref`.
const interp = (ref) => new InterpolatedString(["", ""], [() => ref])

Deno.test("hasContext: plain string has none, interpolated derivation does", () => {
    assertEquals(builtins.hasContext("plain"), false)
    const d = drv({ name: "ctx", outputs: ["out", "dev"], args: ["-c", ":"] })
    assertEquals(builtins.hasContext(interp(d)), true)
    assertEquals(builtins.hasContext(interp(d.dev)), true)
})

Deno.test("getContext shape matches Nix (keyed by drvPath, with referenced outputs)", () => {
    const d = drv({ name: "ctx", outputs: ["out", "dev"], args: ["-c", ":"] })
    const ctx = builtins.getContext(interp(d.dev))
    // exactly one key: the .drv path; value records the "dev" output.
    assertEquals(Object.keys(ctx).length, 1)
    const key = Object.keys(ctx)[0]
    assertEquals(key, d.drvPath)
    assertEquals(ctx[key].outputs, ["dev"])
})

Deno.test("unsafeDiscardStringContext drops context", () => {
    const d = drv({ name: "ctx", outputs: ["out", "dev"], args: ["-c", ":"] })
    const discarded = builtins.unsafeDiscardStringContext(interp(d.dev))
    assertEquals(typeof discarded, "string")
    assertEquals(builtins.hasContext(discarded), false)
})

Deno.test("toFile produces a source-path context (matches Nix)", () => {
    const f = builtins.toFile("f")("x")
    assertEquals(builtins.hasContext(f), true)
    const ctx = builtins.getContext(f)
    const key = Object.keys(ctx)[0]
    assertEquals(key, "/nix/store/x93g3gvygaiq7h4b6zls3w7l5az1y526-f")
    assertEquals(ctx[key].path, true)
})

Deno.test("a toFile source is recorded in inputSrcs (drvPath matches Nix)", () => {
    const d = builtins.derivation({
        name: "usesrc", system: "x86_64-linux", builder: "/bin/sh",
        src: builtins.toFile("f.txt")("hello"),
        args: ["-c", "cat $src > $out"],
    })
    assertEquals(d.drvPath, "/nix/store/2zab7pw29b6gp86g2xxqwidmjw64d55f-usesrc.drv")
})
