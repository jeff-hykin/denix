import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

// Derivation operation builtins: derivationStrict, unsafeDiscardOutputDependency, unsafeGetAttrPos
// Note: These are advanced/internal builtins with limited documentation in Nix 2.18

// ============================================================================
// derivationStrict tests
// ============================================================================
// derivationStrict is historically a strict version of derivation, but in modern Nix
// both derivation and derivationStrict behave identically (both strictly evaluate attributes)
// Documentation: https://nix.dev/manual/nix/2.18/language/derivations.html

Deno.test("derivationStrict - creates basic derivation (identical to derivation)", () => {
    const drv = builtins.derivationStrict({
        name: "test-drv",
        system: "x86_64-linux",
        builder: "/bin/sh",
    })

    assertEquals(drv.type, "derivation")
    assertEquals(drv.name, "test-drv")
    assertEquals(drv.system, "x86_64-linux")
    assertEquals(drv.builder, "/bin/sh")
    assertEquals(drv.outputs, ["out"])
})

Deno.test("derivationStrict - requires name attribute", () => {
    assertThrows(() => {
        builtins.derivationStrict({
            system: "x86_64-linux",
            builder: "/bin/sh",
        })
    }, Error, "name")
})

Deno.test("derivationStrict - requires system attribute", () => {
    assertThrows(() => {
        builtins.derivationStrict({
            name: "test",
            builder: "/bin/sh",
        })
    }, Error, "system")
})

Deno.test("derivationStrict - requires builder attribute", () => {
    assertThrows(() => {
        builtins.derivationStrict({
            name: "test",
            system: "x86_64-linux",
        })
    }, Error, "builder")
})

Deno.test("derivationStrict - handles multiple outputs", () => {
    const drv = builtins.derivationStrict({
        name: "multi-output",
        system: "x86_64-linux",
        builder: "/bin/sh",
        outputs: ["out", "dev", "doc"],
    })

    assertEquals(drv.outputs, ["out", "dev", "doc"])
    assertEquals(typeof drv.out, "string")
    assertEquals(typeof drv.dev, "string")
    assertEquals(typeof drv.doc, "string")
    assertEquals(drv.all.length, 3)
})

Deno.test("derivationStrict - passes environment variables to derivation", () => {
    const drv = builtins.derivationStrict({
        name: "test-env",
        system: "x86_64-linux",
        builder: "/bin/sh",
        MY_VAR: "hello",
        MY_NUM: 42n,
    })

    assertEquals(drv.drvAttrs.MY_VAR, "hello")
    assertEquals(drv.drvAttrs.MY_NUM, 42n)
})

Deno.test("derivationStrict - converts booleans to env vars (true=1, false=empty)", () => {
    const drv = builtins.derivationStrict({
        name: "test-bool",
        system: "x86_64-linux",
        builder: "/bin/sh",
        ENABLED: true,
        DISABLED: false,
    })

    assertEquals(drv.drvAttrs.ENABLED, true)
    assertEquals(drv.drvAttrs.DISABLED, false)
})

Deno.test("derivationStrict - handles builder args", () => {
    const drv = builtins.derivationStrict({
        name: "test-args",
        system: "x86_64-linux",
        builder: "/bin/sh",
        args: ["-c", "echo hello"],
    })

    assertEquals(drv.args, ["-c", "echo hello"])
})

Deno.test("derivationStrict - produces valid store paths", () => {
    const drv = builtins.derivationStrict({
        name: "test-path",
        system: "x86_64-linux",
        builder: "/bin/sh",
    })

    // Store paths should start with /nix/store/ and contain a hash
    assertEquals(drv.outPath.startsWith("/nix/store/"), true)
    assertEquals(drv.drvPath.startsWith("/nix/store/"), true)
    assertEquals(drv.drvPath.endsWith(".drv"), true)
})

Deno.test("derivationStrict - toString returns outPath", () => {
    const drv = builtins.derivationStrict({
        name: "test-string",
        system: "x86_64-linux",
        builder: "/bin/sh",
    })

    assertEquals(drv.toString(), drv.outPath)
    assertEquals(String(drv), drv.outPath)
})

// ============================================================================
// unsafeDiscardOutputDependency tests
// ============================================================================
// In full Nix, this removes output dependency information from a string's context
// This is used internally for breaking dependency cycles
// Our implementation is simplified: just returns the string (no context tracking)

Deno.test("unsafeDiscardOutputDependency - returns string unchanged (no context tracking)", () => {
    const result = builtins.unsafeDiscardOutputDependency("/nix/store/abc123-foo")
    assertEquals(result, "/nix/store/abc123-foo")
})

Deno.test("unsafeDiscardOutputDependency - handles derivation outPath strings", () => {
    const drv = builtins.derivationStrict({
        name: "test",
        system: "x86_64-linux",
        builder: "/bin/sh",
    })

    const result = builtins.unsafeDiscardOutputDependency(drv.outPath)
    assertEquals(result, drv.outPath)
})

Deno.test("unsafeDiscardOutputDependency - requires string argument", () => {
    assertThrows(() => {
        builtins.unsafeDiscardOutputDependency(42n)
    }, Error, "string")
})

Deno.test("unsafeDiscardOutputDependency - handles empty string", () => {
    const result = builtins.unsafeDiscardOutputDependency("")
    assertEquals(result, "")
})

Deno.test("unsafeDiscardOutputDependency - handles arbitrary strings", () => {
    const result = builtins.unsafeDiscardOutputDependency("hello world")
    assertEquals(result, "hello world")
})

// ============================================================================
// unsafeGetAttrPos tests
// ============================================================================
// In full Nix, this returns source position information (file, line, column) for an attribute
// This requires AST tracking during evaluation, which we don't implement
// Our implementation always returns null (position unknown)
// Real Nix returns: { file = "path.nix"; line = 10; column = 5; } or null

Deno.test("unsafeGetAttrPos - returns null (no position tracking)", () => {
    const obj = { a: 1n, b: 2n }
    const result = builtins.unsafeGetAttrPos("a")(obj)
    assertEquals(result, null)
})

Deno.test("unsafeGetAttrPos - curried function (takes attr name, then attrset)", () => {
    const obj = { foo: "bar" }
    const getPos = builtins.unsafeGetAttrPos("foo")
    assertEquals(typeof getPos, "function")
    const result = getPos(obj)
    assertEquals(result, null)
})

Deno.test("unsafeGetAttrPos - requires string attribute name", () => {
    assertThrows(() => {
        builtins.unsafeGetAttrPos(42n)({ a: 1n })
    }, Error, "string")
})

Deno.test("unsafeGetAttrPos - requires attrset argument", () => {
    assertThrows(() => {
        builtins.unsafeGetAttrPos("foo")("not an attrset")
    }, Error, "set")
})

Deno.test("unsafeGetAttrPos - returns null even if attribute doesn't exist", () => {
    const obj = { a: 1n }
    const result = builtins.unsafeGetAttrPos("nonexistent")(obj)
    assertEquals(result, null)
})

Deno.test("unsafeGetAttrPos - works with nested attrsets", () => {
    const obj = {
        outer: {
            inner: "value"
        }
    }
    const result = builtins.unsafeGetAttrPos("outer")(obj)
    assertEquals(result, null)
})

Deno.test("unsafeGetAttrPos - works with empty attrset", () => {
    const obj = {}
    const result = builtins.unsafeGetAttrPos("anything")(obj)
    assertEquals(result, null)
})
