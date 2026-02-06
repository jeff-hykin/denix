// Standalone test for fromTOML to avoid prex WASM issues
import { parse as tomlParse } from "https://deno.land/std@0.224.0/toml/mod.ts"

// Helper to require string (simplified version)
const requireString = (s) => {
    if (typeof s === "string") return { toString: () => s }
    if (s && typeof s.toString === "function") return s
    throw new Error("Expected string")
}

// fromTOML implementation
const fromTOML = (tomlString) => {
    const parsed = tomlParse(requireString(tomlString).toString())
    // recursively convert all integer numbers to BigInts to match Nix behavior
    const convertIntsToBigInt = (value) => {
        if (typeof value === "number" && Number.isInteger(value)) {
            return BigInt(value)
        } else if (Array.isArray(value)) {
            return value.map(convertIntsToBigInt)
        } else if (value && typeof value === "object") {
            const result = {}
            for (const [k, v] of Object.entries(value)) {
                result[k] = convertIntsToBigInt(v)
            }
            return result
        }
        return value
    }
    return convertIntsToBigInt(parsed)
}

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
    const result = fromTOML("value = 42")
    assertEquals(result, { value: 42n })
})) passed++; else failed++;

if (test("fromTOML parses float", () => {
    const result = fromTOML("value = 3.14")
    assertEquals(result, { value: 3.14 })
})) passed++; else failed++;

if (test("fromTOML parses string", () => {
    const result = fromTOML('name = "hello"')
    assertEquals(result, { name: "hello" })
})) passed++; else failed++;

if (test("fromTOML parses array of ints", () => {
    const result = fromTOML("values = [1, 2, 3]")
    assertEquals(result, { values: [1n, 2n, 3n] })
})) passed++; else failed++;

if (test("fromTOML parses nested object", () => {
    const result = fromTOML(`
[server]
port = 8080
host = "localhost"
`)
    assertEquals(result, { server: { port: 8080n, host: "localhost" } })
})) passed++; else failed++;

if (test("fromTOML parses mixed types", () => {
    const result = fromTOML(`
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

if (test("fromTOML negative integer", () => {
    const result = fromTOML("value = -42")
    assertEquals(result, { value: -42n })
})) passed++; else failed++;

console.log(`\n${passed} passed, ${failed} failed`)
