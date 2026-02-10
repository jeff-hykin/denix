import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { Path } from "../runtime.js"

// String operations: toString, split, concatStringsSep, baseNameOf, dirOf

Deno.test("toString - integer", () => {
    assertEquals(builtins.toString(123n), "123")
})

Deno.test("toString - boolean true", () => {
    assertEquals(builtins.toString(true), "1")
})

Deno.test("toString - boolean false", () => {
    assertEquals(builtins.toString(false), "")
})

Deno.test("toString - null", () => {
    assertEquals(builtins.toString(null), "")
})

Deno.test("toString - path", () => {
    const path = new Path(["/foo/bar"])
    assertEquals(builtins.toString(path), "/foo/bar")
})

Deno.test("toString - string", () => {
    assertEquals(builtins.toString("hello"), "hello")
})

Deno.test("toString - float", () => {
    assertEquals(builtins.toString(3.14), "3.14")
})

Deno.test("split - simple pattern", () => {
    const result = builtins.split("(a|b)")("xaybz")
    // Nix returns alternating non-match and match parts
    // ["x", [match-group], "y", [match-group], "z"]
    assertEquals(result.length, 5)
    assertEquals(result[0], "x")
    assertEquals(result[2], "y")
    assertEquals(result[4], "z")
})

Deno.test("split - numeric pattern", () => {
    const result = builtins.split("[0-9]+")("foo123bar456")
    assertEquals(result.length, 5)
    assertEquals(result[0], "foo")
    assertEquals(result[2], "bar")
    assertEquals(result[4], "")
})

Deno.test("split - no matches", () => {
    const result = builtins.split("xyz")("abc")
    assertEquals(result, ["abc"])
})

Deno.test("split - empty string", () => {
    const result = builtins.split("a")("")
    assertEquals(result, [""])
})

Deno.test("concatStringsSep - basic join", () => {
    const result = builtins.concatStringsSep(", ")(["a", "b", "c"])
    assertEquals(result, "a, b, c")
})

Deno.test("concatStringsSep - empty separator", () => {
    const result = builtins.concatStringsSep("")(["x", "y", "z"])
    assertEquals(result, "xyz")
})

Deno.test("concatStringsSep - single element", () => {
    const result = builtins.concatStringsSep(", ")(["only"])
    assertEquals(result, "only")
})

Deno.test("concatStringsSep - empty list", () => {
    const result = builtins.concatStringsSep(", ")([])
    assertEquals(result, "")
})

Deno.test("concatStringsSep - multiple separators", () => {
    const result = builtins.concatStringsSep(" | ")(["foo", "bar", "baz"])
    assertEquals(result, "foo | bar | baz")
})

Deno.test("baseNameOf - file path", () => {
    const result = builtins.baseNameOf("/foo/bar/baz.txt")
    assertEquals(result, "baz.txt")
})

Deno.test("baseNameOf - directory with trailing slash", () => {
    const result = builtins.baseNameOf("/foo/bar/")
    assertEquals(result, "bar")
})

Deno.test("baseNameOf - single component", () => {
    const result = builtins.baseNameOf("file.txt")
    assertEquals(result, "file.txt")
})

Deno.test("baseNameOf - root", () => {
    const result = builtins.baseNameOf("/")
    assertEquals(result, "")
})

Deno.test("dirOf - file path", () => {
    const result = builtins.dirOf("/foo/bar/baz.txt")
    assertEquals(result, "/foo/bar")
})

Deno.test("dirOf - top level path", () => {
    const result = builtins.dirOf("/foo")
    assertEquals(result, "/")
})

Deno.test("dirOf - current directory", () => {
    const result = builtins.dirOf(".")
    assertEquals(result, ".")
})

Deno.test("dirOf - relative path", () => {
    const result = builtins.dirOf("foo/bar")
    assertEquals(result, "foo")
})

Deno.test("dirOf - root", () => {
    const result = builtins.dirOf("/")
    assertEquals(result, "/")
})
