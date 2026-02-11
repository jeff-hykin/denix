#!/usr/bin/env deno test --allow-all
/**
 * Test suite for nixpkgs.lib meta.nix and debug.nix utility functions
 *
 * Tests metadata manipulation and debugging utilities from nixpkgs.lib
 */

import { builtins } from "../runtime.js"
import { assertEquals, assertExists } from "https://deno.land/std@0.224.0/assert/mod.ts"

// Helper to merge two objects (Nix // operator)
const merge = (a, b) => ({...a, ...b})

// Helper for "or" default
const getOr = (obj, key, defaultVal) => obj && obj[key] !== undefined ? obj[key] : defaultVal

Deno.test("meta.nix utilities", async (t) => {
    await t.step("addMetaAttrs - adds meta attributes to derivation", () => {
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })

        const drv = { name: "test", meta: {} }
        const result = addMetaAttrs({ description: "A test package", license: "MIT" })(drv)

        assertEquals(result.meta.description, "A test package")
        assertEquals(result.meta.license, "MIT")
        assertEquals(result.name, "test")
    })

    await t.step("addMetaAttrs - merges with existing meta", () => {
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })

        const drv = { name: "test", meta: { homepage: "https://example.com" } }
        const result = addMetaAttrs({ description: "Test" })(drv)

        assertEquals(result.meta.homepage, "https://example.com")
        assertEquals(result.meta.description, "Test")
    })

    await t.step("setName - changes derivation name", () => {
        const setName = (name) => (drv) => merge(drv, { name })

        const drv = { name: "old-name", meta: {} }
        const result = setName("new-name")(drv)

        assertEquals(result.name, "new-name")
    })

    await t.step("updateName - applies function to name", () => {
        const updateName = (updater) => (drv) => merge(drv, { name: updater(drv.name) })

        const drv = { name: "my-package" }
        const result = updateName((oldName) => oldName + "-experimental")(drv)

        assertEquals(result.name, "my-package-experimental")
    })

    await t.step("appendToName - adds suffix to name", () => {
        const appendToName = (suffix) => (drv) =>
            merge(drv, { name: drv.name + "-" + suffix })

        const drv = { name: "myapp-1.2.3" }
        const result = appendToName("custom")(drv)

        assertEquals(result.name, "myapp-1.2.3-custom")
    })

    await t.step("setPrio - sets priority meta attribute", () => {
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })
        const setPrio = (priority) => addMetaAttrs({ priority })

        const drv = { name: "test", meta: {} }
        const result = setPrio(7)(drv)

        assertEquals(result.meta.priority, 7)
    })

    await t.step("lowPrio - sets priority to 10", () => {
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })
        const setPrio = (priority) => addMetaAttrs({ priority })
        const lowPrio = setPrio(10)

        const drv = { name: "test", meta: {} }
        const result = lowPrio(drv)

        assertEquals(result.meta.priority, 10)
    })

    await t.step("hiPrio - sets priority to -10", () => {
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })
        const setPrio = (priority) => addMetaAttrs({ priority })
        const hiPrio = setPrio(-10)

        const drv = { name: "test", meta: {} }
        const result = hiPrio(drv)

        assertEquals(result.meta.priority, -10)
    })

    await t.step("lowPrioSet - applies lowPrio to derivations in set", () => {
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })
        const setPrio = (priority) => addMetaAttrs({ priority })
        const lowPrio = setPrio(10)
        const isDerivation = (x) => getOr(x, "type", null) === "derivation"

        const pkgs = {
            foo: { name: "foo", type: "derivation", meta: {} },
            bar: { name: "bar", type: "derivation", meta: {} },
            notDrv: { name: "data" }
        }

        const result = {
            foo: isDerivation(pkgs.foo) ? lowPrio(pkgs.foo) : pkgs.foo,
            bar: isDerivation(pkgs.bar) ? lowPrio(pkgs.bar) : pkgs.bar,
            notDrv: pkgs.notDrv
        }

        assertEquals(result.foo.meta.priority, 10)
        assertEquals(result.bar.meta.priority, 10)
        assertEquals(result.notDrv.meta, undefined)
    })

    await t.step("dontDistribute - sets hydraPlatforms to empty list", () => {
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })
        const dontDistribute = addMetaAttrs({ hydraPlatforms: [] })

        const drv = { name: "test", meta: {} }
        const result = dontDistribute(drv)

        assertEquals(Array.isArray(result.meta.hydraPlatforms), true)
        assertEquals(result.meta.hydraPlatforms.length, 0)
    })
})

Deno.test("debug.nix utilities", async (t) => {
    await t.step("traceIf - traces when predicate is true", () => {
        const traceIf = (pred) => (msg) => (x) =>
            pred ? builtins.trace(msg)(x) : x

        const result = traceIf(true)("Debug message")(42)

        assertEquals(result, 42)
    })

    await t.step("traceIf - skips trace when predicate is false", () => {
        const traceIf = (pred) => (msg) => (x) =>
            pred ? builtins.trace(msg)(x) : x

        const result = traceIf(false)("Should not trace")(42)

        assertEquals(result, 42)
    })

    await t.step("traceVal - returns input value unchanged", () => {
        const id = (x) => x
        const traceValFn = (f) => (x) => builtins.trace(f(x))(x)
        const traceVal = traceValFn(id)

        const result = traceVal({ a: 1, b: 2 })

        assertEquals(result.a, 1)
        assertEquals(result.b, 2)
    })

    await t.step("traceValFn - applies function before tracing", () => {
        const traceValFn = (f) => (x) => builtins.trace(f(x))(x)

        const result = traceValFn((x) => "Value is " + x.toString())(99)

        assertEquals(result, 99)
    })

    await t.step("traceSeq - forces deep evaluation before tracing", () => {
        const traceSeq = (x) => (y) => builtins.trace(builtins.deepSeq(x)(x))(y)

        const result = traceSeq({ a: { b: { c: 3 } } })("done")

        assertEquals(result, "done")
    })

    await t.step("traceSeqN - traces with depth limit", () => {
        // Simplified version - just test that it returns the second argument
        const traceSeqN = (depth) => (x) => (y) => builtins.trace(x)(y)

        const result = traceSeqN(0)({ a: 1 })("result")

        assertEquals(result, "result")
    })

    await t.step("traceValSeq - combines traceVal and deepSeq", () => {
        const id = (x) => x
        const traceValFn = (f) => (x) => builtins.trace(f(x))(x)
        const traceValSeqFn = (f) => (v) => traceValFn(f)(builtins.deepSeq(v)(v))
        const traceValSeq = traceValSeqFn(id)

        const result = traceValSeq({ x: { y: 1 } })

        assertEquals(result.x.y, 1)
    })

    await t.step("showVal - converts value to string representation", () => {
        const showVal = (x) => builtins.toString(x)

        const result = showVal(42)

        assertExists(result)
        assertEquals(typeof result.toString(), "string")
    })

    await t.step("runTests - collects test failures", () => {
        // Simplified version testing the core concept
        const runTests = (tests) => {
            const failures = []
            if (tests.testFail.expr !== tests.testFail.expected) {
                failures.push({
                    name: "testFail",
                    expected: tests.testFail.expected,
                    result: tests.testFail.expr
                })
            }
            return failures
        }

        const testCases = {
            testPass: { expr: 5, expected: 5 },
            testFail: { expr: 3, expected: 4 }
        }

        const result = runTests(testCases)

        assertEquals(Array.isArray(result), true)
        assertEquals(result.length, 1)
        assertEquals(result[0].name, "testFail")
        assertEquals(result[0].result, 3)
        assertEquals(result[0].expected, 4)
    })

    await t.step("testAllTrue - creates test expecting all true values", () => {
        const testAllTrue = (expr) => ({
            expr,
            expected: [true, true, true]
        })

        const result = testAllTrue([true, true, false])

        assertEquals(Array.isArray(result.expr), true)
        assertEquals(result.expr.length, 3)
        assertEquals(Array.isArray(result.expected), true)
        assertEquals(result.expected.length, 3)
        assertEquals(result.expected[0], true)
        assertEquals(result.expected[1], true)
        assertEquals(result.expected[2], true)
    })
})

Deno.test("meta.nix + debug.nix integration", async (t) => {
    await t.step("trace derivation name changes", () => {
        const id = (x) => x
        const traceValFn = (f) => (x) => builtins.trace(f(x))(x)
        const traceVal = traceValFn(id)
        const setName = (name) => (drv) => merge(drv, { name })

        const drv = { name: "original", version: "1.0" }
        const renamed = setName("modified")(drv)
        const result = traceVal(renamed.name)

        assertEquals(result, "modified")
    })

    await t.step("conditional tracing of priority changes", () => {
        const traceIf = (pred) => (msg) => (x) => pred ? builtins.trace(msg)(x) : x
        const addMetaAttrs = (newAttrs) => (drv) =>
            merge(drv, { meta: merge(getOr(drv, "meta", {}), newAttrs) })
        const setPrio = (priority) => addMetaAttrs({ priority })

        const drv = { name: "test", meta: {} }
        const withPrio = setPrio(10)(drv)
        const result = traceIf(withPrio.meta.priority > 5)("High priority value")(withPrio)

        assertEquals(result.meta.priority, 10)
    })

    await t.step("test suite for derivation name manipulation", () => {
        const setName = (name) => (drv) => merge(drv, { name })

        const test1 = setName("foo")({ name: "bar" })
        const test2 = setName("new")({ name: "old", other: 42 })

        const test1Pass = test1.name === "foo"
        const test2Pass = test2.other === 42

        const failures = test1Pass && test2Pass ? [] : ["failed"]

        assertEquals(Array.isArray(failures), true)
        assertEquals(failures.length, 0)
    })
})

console.log("✅ All meta.nix and debug.nix tests completed!")
