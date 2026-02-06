import { createRuntime } from "../runtime.js"

const runtime = createRuntime()
const { builtins } = runtime.rootScope

// Test helper
function test(name, fn) {
    try {
        fn()
        console.log(`✓ ${name}`)
        return true
    } catch (e) {
        console.log(`✗ ${name}: ${e.message}`)
        return false
    }
}

function assertEquals(actual, expected, message = "") {
    const actualStr = JSON.stringify(actual, (k, v) => typeof v === 'bigint' ? v.toString() + 'n' : v)
    const expectedStr = JSON.stringify(expected, (k, v) => typeof v === 'bigint' ? v.toString() + 'n' : v)
    if (actualStr !== expectedStr) {
        throw new Error(`${message}\nExpected: ${expectedStr}\nActual: ${actualStr}`)
    }
}

// Tests
let passed = 0
let failed = 0

if (test("fromTOML parses simple int", () => {
    const result = builtins.fromTOML("value = 42")
    assertEquals(result, { value: 42n })
})) passed++; else failed++;

if (test("fromTOML parses float", () => {
    const result = builtins.fromTOML("value = 3.14")
    assertEquals(result, { value: 3.14 })
})) passed++; else failed++;

if (test("fromTOML parses string", () => {
    const result = builtins.fromTOML('name = "hello"')
    assertEquals(result, { name: "hello" })
})) passed++; else failed++;

if (test("fromTOML parses array of ints", () => {
    const result = builtins.fromTOML("values = [1, 2, 3]")
    assertEquals(result, { values: [1n, 2n, 3n] })
})) passed++; else failed++;

if (test("fromTOML parses nested object", () => {
    const result = builtins.fromTOML(`
[server]
port = 8080
host = "localhost"
`)
    assertEquals(result, { server: { port: 8080n, host: "localhost" } })
})) passed++; else failed++;

if (test("fromTOML parses mixed types", () => {
    const result = builtins.fromTOML(`
name = "myapp"
version = 1
pi = 3.14159
enabled = true
`)
    assertEquals(result, {
        name: "myapp",
        version: 1n,
        pi: 3.14159,
        enabled: true
    })
})) passed++; else failed++;

console.log(`\n${passed} passed, ${failed} failed`)
