import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

// Miscellaneous functions: toPath, toXML, fromJSON, abort, getAttr, splitVersion
// Documentation: https://nix.dev/manual/nix/2.28/language/builtins.html

// toPath tests
// nix repl> builtins.toPath "/absolute/path"
// /absolute/path
// nix repl> builtins.toPath "relative"
// error: string 'relative' doesn't represent an absolute path

Deno.test("toPath - converts absolute path string to path", () => {
    const result = builtins.toPath("/nix/store/test")
    assertEquals(result.toString(), "/nix/store/test")
})

Deno.test("toPath - handles home directory", () => {
    const result = builtins.toPath("/home/user/file.txt")
    assertEquals(result.toString(), "/home/user/file.txt")
})

Deno.test("toPath - throws on relative path", () => {
    assertThrows(() => {
        builtins.toPath("relative/path")
    }, Error, "absolute")
})

Deno.test("toPath - throws on empty string", () => {
    assertThrows(() => {
        builtins.toPath("")
    }, Error, "absolute")
})

// toXML tests
// nix repl> builtins.toXML { a = 1; b = "hello"; }
// <?xml version='1.0' encoding='utf-8'?>
// <expr>
//   <attrs>
//     <attr name="a"><int value="1" /></attr>
//     <attr name="b"><string value="hello" /></attr>
//   </attrs>
// </expr>

Deno.test("toXML - converts integer to XML", () => {
    const result = builtins.toXML(42n)
    assertEquals(result.includes("<int value=\"42\" />"), true)
})

Deno.test("toXML - converts string to XML", () => {
    const result = builtins.toXML("hello")
    assertEquals(result.includes("<string value=\"hello\" />"), true)
})

Deno.test("toXML - converts boolean to XML", () => {
    const result = builtins.toXML(true)
    assertEquals(result.includes("<bool value=\"true\" />"), true)
})

Deno.test("toXML - converts list to XML", () => {
    const result = builtins.toXML([1n, 2n, 3n])
    assertEquals(result.includes("<list>"), true)
    assertEquals(result.includes("<int value=\"1\" />"), true)
})

Deno.test("toXML - converts attrset to XML", () => {
    const result = builtins.toXML({ a: 1n, b: "hello" })
    assertEquals(result.includes("<attrs>"), true)
    assertEquals(result.includes("name=\"a\""), true)
    assertEquals(result.includes("name=\"b\""), true)
})

Deno.test("toXML - handles null", () => {
    const result = builtins.toXML(null)
    assertEquals(result.includes("<null />"), true)
})

// fromJSON tests
// nix repl> builtins.fromJSON "{\"a\":1,\"b\":\"hello\"}"
// { a = 1; b = "hello"; }

Deno.test("fromJSON - parses simple object", () => {
    const result = builtins.fromJSON("{\"a\":1,\"b\":\"hello\"}")
    assertEquals(result.a, 1n)
    assertEquals(result.b, "hello")
})

Deno.test("fromJSON - parses array", () => {
    const result = builtins.fromJSON("[1,2,3]")
    assertEquals(result, [1n, 2n, 3n])
})

Deno.test("fromJSON - parses string", () => {
    const result = builtins.fromJSON("\"hello\"")
    assertEquals(result, "hello")
})

Deno.test("fromJSON - parses number", () => {
    const result = builtins.fromJSON("42")
    assertEquals(result, 42n)
})

Deno.test("fromJSON - parses boolean", () => {
    const result = builtins.fromJSON("true")
    assertEquals(result, true)
})

Deno.test("fromJSON - parses null", () => {
    const result = builtins.fromJSON("null")
    assertEquals(result, null)
})

Deno.test("fromJSON - handles nested structures", () => {
    const result = builtins.fromJSON("{\"a\":{\"b\":[1,2,3]}}")
    assertEquals(result.a.b, [1n, 2n, 3n])
})

Deno.test("fromJSON - throws on invalid JSON", () => {
    assertThrows(() => {
        builtins.fromJSON("{invalid json}")
    })
})

// abort tests
// nix repl> builtins.abort "error message"
// error: evaluation aborted with the following error message: 'error message'

Deno.test("abort - throws with message", () => {
    assertThrows(() => {
        builtins.abort("custom error")
    }, Error, "evaluation aborted")
})

Deno.test("abort - includes the error message", () => {
    assertThrows(() => {
        builtins.abort("my custom message")
    }, Error, "my custom message")
})

Deno.test("abort - works with non-string values", () => {
    assertThrows(() => {
        builtins.abort(42n)
    }, Error, "evaluation aborted")
})

// getAttr tests
// nix repl> builtins.getAttr "a" { a = 1; b = 2; }
// 1

Deno.test("getAttr - gets attribute from attrset", () => {
    const result = builtins.getAttr("a")({ a: 1n, b: 2n })
    assertEquals(result, 1n)
})

Deno.test("getAttr - throws on missing attribute", () => {
    assertThrows(() => {
        builtins.getAttr("c")({ a: 1n, b: 2n })
    }, Error, "missing")
})

Deno.test("getAttr - works with string attributes", () => {
    const result = builtins.getAttr("name")({ name: "test", value: 123n })
    assertEquals(result, "test")
})

Deno.test("getAttr - works with nested access", () => {
    const obj = { a: { b: { c: 42n } } }
    const result = builtins.getAttr("a")(obj)
    assertEquals(result.b.c, 42n)
})

// splitVersion tests
// nix repl> builtins.splitVersion "1.2.3"
// [ "1" "2" "3" ]
// nix repl> builtins.splitVersion "2.4.23.1a"
// [ "2" "4" "23" "1" "a" ]

Deno.test("splitVersion - splits simple version", () => {
    const result = builtins.splitVersion("1.2.3")
    assertEquals(result, ["1", "2", "3"])
})

Deno.test("splitVersion - splits complex version", () => {
    const result = builtins.splitVersion("2.4.23.1a")
    assertEquals(result, ["2", "4", "23", "1", "a"])
})

Deno.test("splitVersion - handles version with letters", () => {
    const result = builtins.splitVersion("1.2beta3")
    assertEquals(result, ["1", "2", "beta", "3"])
})

Deno.test("splitVersion - handles single component", () => {
    const result = builtins.splitVersion("5")
    assertEquals(result, ["5"])
})

Deno.test("splitVersion - handles empty string", () => {
    const result = builtins.splitVersion("")
    assertEquals(result, [])
})

Deno.test("splitVersion - splits on dots and boundaries", () => {
    const result = builtins.splitVersion("1.2-rc3")
    assertEquals(result.includes("1"), true)
    assertEquals(result.includes("2"), true)
})

// fromTOML tests (consolidated from fromtoml_test.js)
function assertEqualsWithBigInt(actual, expected) {
    const actualStr = JSON.stringify(actual, (k, v) => typeof v === 'bigint' ? v.toString() + 'n' : v)
    const expectedStr = JSON.stringify(expected, (k, v) => typeof v === 'bigint' ? v.toString() + 'n' : v)
    assertEquals(actualStr, expectedStr)
}

Deno.test("fromTOML - parses simple int", () => {
    const result = builtins.fromTOML("value = 42")
    assertEqualsWithBigInt(result, { value: 42n })
})

Deno.test("fromTOML - parses float", () => {
    const result = builtins.fromTOML("value = 3.14")
    assertEquals(result.value, 3.14)
})

Deno.test("fromTOML - parses string", () => {
    const result = builtins.fromTOML('name = "hello"')
    assertEquals(result.name, "hello")
})

Deno.test("fromTOML - parses array of ints", () => {
    const result = builtins.fromTOML("values = [1, 2, 3]")
    assertEqualsWithBigInt(result, { values: [1n, 2n, 3n] })
})

Deno.test("fromTOML - parses nested object", () => {
    const result = builtins.fromTOML(`
[server]
port = 8080
host = "localhost"
`)
    assertEqualsWithBigInt(result, { server: { port: 8080n, host: "localhost" } })
})

Deno.test("fromTOML - parses mixed types", () => {
    const result = builtins.fromTOML(`
name = "myapp"
version = 1
pi = 3.14159
enabled = true
`)
    assertEqualsWithBigInt(result, {
        name: "myapp",
        version: 1n,
        pi: 3.14159,
        enabled: true
    })
})
