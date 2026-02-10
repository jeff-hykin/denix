import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { createRuntime } from "../runtime.js"

const runtime = createRuntime()
const { builtins } = runtime.rootScope

// Helper to compare with BigInt support
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
