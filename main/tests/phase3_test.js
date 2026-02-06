#!/usr/bin/env -S deno run --allow-all
// Phase 3 tests - Additional implementations

import { builtins, operators } from "../runtime.js"

console.log("Testing Phase 3 implementations...")

// Operators
console.log("\n=== Operators ===")

// add
try {
    const r1 = operators.add(5n, 3n)
    console.assert(r1 === 8n, "add: 5 + 3 = 8")
    console.log("✓ add: integers")
} catch(e) { console.error("✗ add integers:", e.message) }

try {
    const r2 = operators.add(5.5, 3.2)
    console.assert(Math.abs(r2 - 8.7) < 0.0001, "add: 5.5 + 3.2 = 8.7")
    console.log("✓ add: floats")
} catch(e) { console.error("✗ add floats:", e.message) }

try {
    const r3 = operators.add("hello", "world")
    console.assert(r3 === "helloworld", "add: string concatenation")
    console.log("✓ add: strings")
} catch(e) { console.error("✗ add strings:", e.message) }

// subtract
try {
    const r1 = operators.subtract(10n, 3n)
    console.assert(r1 === 7n, "subtract: 10 - 3 = 7")
    console.log("✓ subtract: integers")
} catch(e) { console.error("✗ subtract integers:", e.message) }

try {
    const r2 = operators.subtract(10.5, 3.2)
    console.assert(Math.abs(r2 - 7.3) < 0.0001, "subtract: 10.5 - 3.2 = 7.3")
    console.log("✓ subtract: floats")
} catch(e) { console.error("✗ subtract floats:", e.message) }

// Builtins
console.log("\n=== Builtins ===")

// functionArgs
try {
    const testFn = (x) => x + 1
    const result = builtins.functionArgs(testFn)
    console.assert(typeof result === "object", "functionArgs returns object")
    console.log("✓ functionArgs: basic")
} catch(e) { console.error("✗ functionArgs:", e.message) }

try {
    const testFn = (x) => x + 1
    testFn.__functionArgs = { x: false, y: true }
    const result = builtins.functionArgs(testFn)
    console.assert(result.x === false && result.y === true, "functionArgs respects metadata")
    console.log("✓ functionArgs: with metadata")
} catch(e) { console.error("✗ functionArgs with metadata:", e.message) }

// genericClosure
try {
    const result = builtins.genericClosure({
        startSet: [
            { key: 1, value: "a" },
            { key: 2, value: "b" }
        ],
        operator: (item) => {
            if (item.key === 1) {
                return [{ key: 3, value: "c" }]
            } else if (item.key === 2) {
                return [{ key: 4, value: "d" }]
            }
            return []
        }
    })
    console.assert(result.length === 4, "genericClosure finds all nodes")
    console.assert(result.map(x => x.key).sort().join(",") === "1,2,3,4", "genericClosure has correct keys")
    console.log("✓ genericClosure: basic")
} catch(e) { console.error("✗ genericClosure:", e.message) }

try {
    const result = builtins.genericClosure({
        startSet: [{ key: "a", deps: ["b"] }],
        operator: (item) => {
            const depMap = {
                "a": ["b", "c"],
                "b": ["d"],
                "c": ["d"],
                "d": []
            }
            return (depMap[item.key] || []).map(k => ({ key: k, deps: depMap[k] || [] }))
        }
    })
    console.assert(result.length === 4, "genericClosure handles graph with cycles")
    console.log("✓ genericClosure: graph traversal")
} catch(e) { console.error("✗ genericClosure graph:", e.message) }

// Context functions (simplified implementations)
console.log("\n=== Context Functions (Simplified) ===")

try {
    const result = builtins.getContext("hello")
    console.assert(typeof result === "object", "getContext returns object")
    console.log("✓ getContext")
} catch(e) { console.error("✗ getContext:", e.message) }

try {
    const result = builtins.hasContext("hello")
    console.assert(result === false, "hasContext returns false (no tracking)")
    console.log("✓ hasContext")
} catch(e) { console.error("✗ hasContext:", e.message) }

try {
    const result = builtins.unsafeDiscardStringContext("hello")
    console.assert(result === "hello", "unsafeDiscardStringContext returns string")
    console.log("✓ unsafeDiscardStringContext")
} catch(e) { console.error("✗ unsafeDiscardStringContext:", e.message) }

try {
    const result = builtins.appendContext("hello")({ path: "/nix/store/..." })
    console.assert(result === "hello", "appendContext returns string")
    console.log("✓ appendContext")
} catch(e) { console.error("✗ appendContext:", e.message) }

try {
    const result = builtins.addErrorContext("context")(42)
    console.assert(result === 42, "addErrorContext returns value")
    console.log("✓ addErrorContext")
} catch(e) { console.error("✗ addErrorContext:", e.message) }

// Store functions
console.log("\n=== Store Functions ===")

try {
    const result = builtins.storeDir()
    console.assert(result === "/nix/store", "storeDir returns /nix/store")
    console.log("✓ storeDir")
} catch(e) { console.error("✗ storeDir:", e.message) }

try {
    const result = builtins.placeholder("out")
    console.assert(typeof result === "string", "placeholder returns string")
    console.assert(result.startsWith("/"), "placeholder starts with /")
    console.log("✓ placeholder")
} catch(e) { console.error("✗ placeholder:", e.message) }

try {
    const result = builtins.nixPath()
    console.assert(Array.isArray(result), "nixPath returns array")
    console.log("✓ nixPath")
} catch(e) { console.error("✗ nixPath:", e.message) }

try {
    const result = builtins.unsafeDiscardOutputDependency("/nix/store/abc-foo")
    console.assert(typeof result === "string", "unsafeDiscardOutputDependency returns string")
    console.log("✓ unsafeDiscardOutputDependency")
} catch(e) { console.error("✗ unsafeDiscardOutputDependency:", e.message) }

try {
    const result = builtins.unsafeGetAttrPos("x")({ x: 42 })
    console.assert(result === null, "unsafeGetAttrPos returns null (no tracking)")
    console.log("✓ unsafeGetAttrPos")
} catch(e) { console.error("✗ unsafeGetAttrPos:", e.message) }

console.log("\n=== Phase 3 Tests Complete ===")
