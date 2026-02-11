import { convertToJs } from "../translator.js"
import { createRuntime } from "../runtime.js"
import { assertEquals, assertThrows } from "jsr:@std/assert"
import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

const evalNix = (nixCode) => {
    const jsCode = convertToJs(nixCode, { relativePath: resolve(Deno.cwd(), "test.nix") })

    // Create runtime with import support
    const runtime = createRuntime()

    // Evaluate the translated code
    return eval(jsCode)
}

Deno.test("attrsets.nix - attrByPath function", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.attrByPath ["a" "b"] 6 { a = { b = 3; }; }
    `)
    assertEquals(result, 3n)
})

Deno.test("attrsets.nix - attrByPath with default", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.attrByPath ["z" "z"] 6 { a = { b = 3; }; }
    `)
    assertEquals(result, 6n)
})

Deno.test("attrsets.nix - hasAttrByPath exists", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.hasAttrByPath ["a" "b"] { a = { b = 3; }; }
    `)
    assertEquals(result, true)
})

Deno.test("attrsets.nix - hasAttrByPath missing", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.hasAttrByPath ["z" "z"] { a = { b = 3; }; }
    `)
    assertEquals(result, false)
})

Deno.test("attrsets.nix - hasAttrByPath empty path", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.hasAttrByPath [] { a = 1; }
    `)
    assertEquals(result, true)
})

Deno.test("attrsets.nix - setAttrByPath", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.setAttrByPath ["a" "b"] 3
    `)
    assertEquals(result, { a: { b: 3n } })
})

Deno.test("attrsets.nix - getAttrFromPath", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.getAttrFromPath ["a" "b"] { a = { b = 3; }; }
    `)
    assertEquals(result, 3n)
})

Deno.test("attrsets.nix - attrVals", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.attrVals ["a" "c"] { a = 1; b = 2; c = 3; }
    `)
    assertEquals(result, [1n, 3n])
})

Deno.test("attrsets.nix - catAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.catAttrs "a" [{a = 1;} {b = 0;} {a = 2;}]
    `)
    assertEquals(result, [1n, 2n])
})

Deno.test("attrsets.nix - filterAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.filterAttrs (n: v: n == "foo") { foo = 1; bar = 2; }
    `)
    assertEquals(result, { foo: 1n })
})

Deno.test("attrsets.nix - filterAttrsRecursive", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.filterAttrsRecursive (n: v: v != null) { foo = { bar = null; baz = 1; }; }
    `)
    assertEquals(result, { foo: { baz: 1n } })
})

Deno.test("attrsets.nix - foldlAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.foldlAttrs
            (acc: name: value: acc + value)
            0
            { foo = 1; bar = 10; }
    `)
    assertEquals(result, 11n)
})

Deno.test("attrsets.nix - collect", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.collect builtins.isList { a = { b = ["b"]; }; c = [1]; }
    `)
    assertEquals(result, [["b"], [1n]])
})

Deno.test("attrsets.nix - nameValuePair", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.nameValuePair "some" 6
    `)
    assertEquals(result, { name: "some", value: 6n })
})

Deno.test("attrsets.nix - mapAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mapAttrs (name: value: value * 2) { x = 1; y = 2; }
    `)
    assertEquals(result, { x: 2n, y: 4n })
})

Deno.test("attrsets.nix - mapAttrs'", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mapAttrs' (name: value: lib.attrsets.nameValuePair ("foo_" + name) ("bar-" + value))
           { x = "a"; y = "b"; }
    `)
    assertEquals(result, { foo_x: "bar-a", foo_y: "bar-b" })
})

Deno.test("attrsets.nix - mapAttrsToList", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mapAttrsToList (name: value: name + value) { x = "a"; y = "b"; }
    `)
    // Sort the result since mapAttrsToList doesn't guarantee order
    assertEquals(result.sort(), ["xa", "yb"])
})

Deno.test("attrsets.nix - attrsToList", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.attrsToList { foo = 1; bar = "asdf"; }
    `)
    // Sort by name to get predictable order
    const sorted = result.sort((a, b) => a.name < b.name ? -1 : 1)
    assertEquals(sorted, [
        { name: "bar", value: "asdf" },
        { name: "foo", value: 1n }
    ])
})

Deno.test("attrsets.nix - mapAttrsRecursive", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mapAttrsRecursive
            (path: value: builtins.concatStringsSep "-" (path ++ [value]))
            { n = { a = "A"; }; d = "D"; }
    `)
    assertEquals(result, { n: { a: "n-a-A" }, d: "d-D" })
})

Deno.test("attrsets.nix - genAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.genAttrs [ "foo" "bar" ] (name: "x_" + name)
    `)
    assertEquals(result, { foo: "x_foo", bar: "x_bar" })
})

Deno.test("attrsets.nix - isDerivation true", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.isDerivation { type = "derivation"; }
    `)
    assertEquals(result, true)
})

Deno.test("attrsets.nix - isDerivation false", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.isDerivation "foobar"
    `)
    assertEquals(result, false)
})

Deno.test("attrsets.nix - optionalAttrs true", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.optionalAttrs true { my = "set"; }
    `)
    assertEquals(result, { my: "set" })
})

Deno.test("attrsets.nix - optionalAttrs false", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.optionalAttrs false { my = "set"; }
    `)
    assertEquals(result, {})
})

Deno.test("attrsets.nix - zipAttrsWith", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.zipAttrsWith (name: values: values) [{a = "x";} {a = "y"; b = "z";}]
    `)
    assertEquals(result, { a: ["x", "y"], b: ["z"] })
})

Deno.test("attrsets.nix - zipAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.zipAttrs [{a = "x";} {a = "y"; b = "z";}]
    `)
    assertEquals(result, { a: ["x", "y"], b: ["z"] })
})

Deno.test("attrsets.nix - recursiveUpdate", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.recursiveUpdate
            { boot = { loader = { grub = { enable = true; device = "/dev/hda"; }; }; }; }
            { boot = { loader = { grub = { device = ""; }; }; }; }
    `)
    assertEquals(result, {
        boot: {
            loader: {
                grub: {
                    enable: true,
                    device: ""
                }
            }
        }
    })
})

Deno.test("attrsets.nix - matchAttrs true", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.matchAttrs { cpu = {}; } { cpu = { bits = 64; }; }
    `)
    assertEquals(result, true)
})

Deno.test("attrsets.nix - matchAttrs false", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.matchAttrs { cpu = { bits = 32; }; } { cpu = { bits = 64; }; }
    `)
    assertEquals(result, false)
})

Deno.test("attrsets.nix - overrideExisting", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.overrideExisting { a = 3; b = 2; } { a = 1; }
    `)
    assertEquals(result, { a: 1n, b: 2n })
})

Deno.test("attrsets.nix - overrideExisting no override", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.overrideExisting { b = 2; } { a = 1; }
    `)
    assertEquals(result, { b: 2n })
})

Deno.test("attrsets.nix - cartesianProduct", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.cartesianProduct { a = [ 1 2 ]; b = [ 10 20 ]; }
    `)
    assertEquals(result, [
        { a: 1n, b: 10n },
        { a: 1n, b: 20n },
        { a: 2n, b: 10n },
        { a: 2n, b: 20n }
    ])
})

Deno.test("attrsets.nix - getAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.getAttrs [ "a" "b" ] { a = 1; b = 2; c = 3; }
    `)
    assertEquals(result, { a: 1n, b: 2n })
})

Deno.test("attrsets.nix - concatMapAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.concatMapAttrs
            (name: value: {
                \${name} = value;
                \${name + value} = value;
            })
            { x = "a"; y = "b"; }
    `)
    assertEquals(result, { x: "a", xa: "a", y: "b", yb: "b" })
})

Deno.test("attrsets.nix - mergeAttrsList empty", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mergeAttrsList []
    `)
    assertEquals(result, {})
})

Deno.test("attrsets.nix - mergeAttrsList multiple", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mergeAttrsList [ { a = 0; b = 1; } { c = 2; d = 3; } ]
    `)
    assertEquals(result, { a: 0n, b: 1n, c: 2n, d: 3n })
})

Deno.test("attrsets.nix - mergeAttrsList override", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mergeAttrsList [ { a = 0; } { a = 1; } ]
    `)
    assertEquals(result, { a: 1n })
})

Deno.test("attrsets.nix - recursiveUpdateUntil", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.recursiveUpdateUntil
            (path: lhs: rhs: path == ["foo"])
            { foo = { bar = 1; baz = 2; }; bar = 3; }
            { foo = { bar = 1; quz = 2; }; baz = 4; }
    `)
    assertEquals(result, {
        foo: { bar: 1n, quz: 2n },
        bar: 3n,
        baz: 4n
    })
})

Deno.test("attrsets.nix - mapCartesianProduct", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mapCartesianProduct ({a, b}: a + b) { a = [ 1 2 ]; b = [ 10 20 ]; }
    `)
    assertEquals(result, [11n, 21n, 12n, 22n])
})

Deno.test("attrsets.nix - foldAttrs", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.foldAttrs (item: acc: [item] ++ acc) [] [{ a = 2; } { a = 3; }]
    `)
    assertEquals(result, { a: [2n, 3n] })
})

Deno.test("attrsets.nix - longestValidPathPrefix full", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.longestValidPathPrefix ["a" "b"] { a = { b = 3; }; }
    `)
    assertEquals(result, ["a", "b"])
})

Deno.test("attrsets.nix - longestValidPathPrefix partial", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.longestValidPathPrefix ["a" "b" "c"] { a = { b = 3; }; }
    `)
    assertEquals(result, ["a", "b"])
})

Deno.test("attrsets.nix - longestValidPathPrefix empty", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.longestValidPathPrefix ["z" "z"] { a = { b = 3; }; }
    `)
    assertEquals(result, [])
})

Deno.test("attrsets.nix - showAttrPath", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.showAttrPath [ "foo" "10" "bar" ]
    `)
    assertEquals(result, 'foo."10".bar')
})

Deno.test("attrsets.nix - showAttrPath empty", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.showAttrPath []
    `)
    assertEquals(result, "<root attribute path>")
})

Deno.test("attrsets.nix - zipAttrsWithNames", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.zipAttrsWithNames ["a"] (name: vs: vs) [{a = "x";} {a = "y"; b = "z";}]
    `)
    assertEquals(result, { a: ["x", "y"] })
})

Deno.test("attrsets.nix - genAttrs'", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.genAttrs' [ "foo" "bar" ] (s: lib.attrsets.nameValuePair ("x_" + s) ("y_" + s))
    `)
    assertEquals(result, { x_foo: "y_foo", x_bar: "y_bar" })
})

Deno.test("attrsets.nix - mapAttrsRecursiveCond", () => {
    const result = evalNix(`
        let lib = import ./tests/fixtures/nixpkgs-lib/lib { };
        in lib.attrsets.mapAttrsRecursiveCond
            (as: !(as ? "type" && as.type == "derivation"))
            (path: x: if builtins.isAttrs x && x ? type && x.type == "derivation" then x.name else x)
            { a = { type = "derivation"; name = "test"; }; b = { c = 1; }; }
    `)
    assertEquals(result, { a: "test", b: { c: 1n } })
})
