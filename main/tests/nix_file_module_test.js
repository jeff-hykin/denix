#!/usr/bin/env deno run --allow-all
/**
 * Tests for the module shape translated files are emitted in:
 * a `nixFile(...)` wrapper plus hoisted static imports.
 */

import { convertToJsSync } from "../../translator.js"
import { createRuntime, nixFile } from "../runtime.js"
import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.224.0/assert/mod.ts"

Deno.test("translated module takes a runtime instead of making one", () => {
    const js = convertToJsSync("1 + 1", { sourceFile: "/tmp/example.nix", runtimePath: "./runtime.js" })
    assertStringIncludes(js, `import { nixFile } from "./runtime.js"`)
    assertStringIncludes(js, `export default nixFile("/tmp/example.nix", ({ scope }) => (`)
    assertEquals(js.includes("createRuntime"), false)
})

Deno.test("bare mode emits just the expression", () => {
    const js = convertToJsSync("1 + 1", { bare: true })
    assertEquals(js.includes("nixFile"), false)
    assertEquals(js.trim().startsWith("export default "), true)
})

Deno.test("static nix imports become hoisted JS imports", () => {
    const seen = []
    const js = convertToJsSync("import ./other.nix", {
        sourceFile: "/tmp/example.nix",
        resolveStaticImport: (target) => {
            seen.push(target)
            return { identifier: "_nix_other_1234abcd", specifier: "./other.js" }
        },
    })
    assertEquals(seen, ["/tmp/other.nix"])
    assertStringIncludes(js, `import _nix_other_1234abcd from "./other.js"`)
    assertStringIncludes(js, "_nix_other_1234abcd(scope.runtime$)")
})

// `import ./x.nix { }` is one flattened apply in the AST, so the hoisted module
// has to come back out as the callee of the remaining arguments.
Deno.test("arguments applied to a hoisted import still go through apply", () => {
    const js = convertToJsSync("import ./other.nix { a = 1; }", {
        sourceFile: "/tmp/example.nix",
        resolveStaticImport: () => ({ identifier: "_nix_other_1234abcd", specifier: "./other.js" }),
    })
    assertStringIncludes(js, "scope.apply$(_nix_other_1234abcd(scope.runtime$)")
})

Deno.test("imports of non-literal paths are reported, not hoisted", () => {
    const reported = []
    const js = convertToJsSync(`let f = p: import p; in f ./other.nix`, {
        sourceFile: "/tmp/example.nix",
        resolveStaticImport: () => ({ identifier: "_nope", specifier: "./nope.js" }),
        reportDynamicImport: (info) => reported.push(info.text),
    })
    assertEquals(reported, ["import p"])
    assertEquals(js.includes("_nope"), false)
})

Deno.test("nixFile evaluates against the given runtime, once per runtime", () => {
    let evaluations = 0
    const file = nixFile("/tmp/example.nix", ({ scope }) => {
        evaluations++
        return scope.builtins$.add(1n)(2n)
    })

    const runtimeA = createRuntime()
    assertEquals(file(runtimeA), 3n)
    assertEquals(file(runtimeA), 3n)
    assertEquals(evaluations, 1)

    // a different runtime is a different evaluation (different store, scope, …)
    assertEquals(file(createRuntime()), 3n)
    assertEquals(evaluations, 2)
})
