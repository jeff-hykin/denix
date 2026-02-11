import { builtins } from "../runtime.js"

// ============================================================================
// Control Flow Builtins Tests
// ============================================================================
// Tests for: break, traceVerbose, genericClosure
// Reference: https://nix.dev/manual/nix/2.18/language/builtins
// ============================================================================

Deno.test("break - returns value unchanged (debug no-op)", () => {
    const result = builtins.break("test value")
    if (result !== "test value") throw new Error(`Expected "test value", got ${result}`)
})

Deno.test("break - works with numbers", () => {
    const result = builtins.break(42)
    if (result !== 42) throw new Error(`Expected 42, got ${result}`)
})

Deno.test("break - works with null", () => {
    const result = builtins.break(null)
    if (result !== null) throw new Error(`Expected null, got ${result}`)
})

Deno.test("break - works with attrsets", () => {
    const obj = { a: 1, b: 2 }
    const result = builtins.break(obj)
    if (result !== obj) throw new Error(`Expected same object reference`)
})

// ============================================================================
// traceVerbose Tests
// ============================================================================

Deno.test("traceVerbose - returns second argument without env var", () => {
    // Ensure NIX_TRACE_VERBOSE is not set
    const original = Deno.env.get("NIX_TRACE_VERBOSE")
    if (original) Deno.env.delete("NIX_TRACE_VERBOSE")

    const result = builtins.traceVerbose("verbose message")(42)

    // Restore original value
    if (original) Deno.env.set("NIX_TRACE_VERBOSE", original)

    if (result !== 42) throw new Error(`Expected 42, got ${result}`)
})

Deno.test("traceVerbose - returns second argument with env var set", () => {
    // Set NIX_TRACE_VERBOSE
    const original = Deno.env.get("NIX_TRACE_VERBOSE")
    Deno.env.set("NIX_TRACE_VERBOSE", "1")

    const result = builtins.traceVerbose("verbose message")(42)

    // Restore original value
    if (original) {
        Deno.env.set("NIX_TRACE_VERBOSE", original)
    } else {
        Deno.env.delete("NIX_TRACE_VERBOSE")
    }

    if (result !== 42) throw new Error(`Expected 42, got ${result}`)
})

Deno.test("traceVerbose - is curried", () => {
    const original = Deno.env.get("NIX_TRACE_VERBOSE")
    if (original) Deno.env.delete("NIX_TRACE_VERBOSE")

    const partiallyApplied = builtins.traceVerbose("message")
    const result = partiallyApplied("result")

    if (original) Deno.env.set("NIX_TRACE_VERBOSE", original)

    if (result !== "result") throw new Error(`Expected "result", got ${result}`)
})

// ============================================================================
// genericClosure Tests
// ============================================================================

Deno.test("genericClosure - empty startSet returns empty list", () => {
    const result = builtins.genericClosure({
        startSet: [],
        operator: (item) => []
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 0) throw new Error(`Expected empty array, got length ${result.length}`)
})

Deno.test("genericClosure - single item with no expansion", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: 1 }],
        operator: (item) => []
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 1) throw new Error(`Expected 1 item, got ${result.length}`)
    if (result[0].key !== 1) throw new Error(`Expected key=1, got ${result[0].key}`)
})

Deno.test("genericClosure - Collatz sequence (example from docs)", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: 5 }],
        operator: (item) => [{
            // Use Math.floor for integer division to match Nix behavior
            key: Math.floor(item.key / 2) * 2 == item.key
                ? Math.floor(item.key / 2)
                : 3 * item.key + 1
        }]
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 6) throw new Error(`Expected 6 items, got ${result.length}`)

    const keys = result.map(item => item.key)
    const expected = [5, 16, 8, 4, 2, 1]
    for (let i = 0; i < expected.length; i++) {
        if (keys[i] !== expected[i]) {
            throw new Error(`Expected key[${i}]=${expected[i]}, got ${keys[i]}`)
        }
    }
})

Deno.test("genericClosure - preserves extra fields", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: 1, value: "a" }],
        operator: (item) => {
            if (item.key < 3) {
                return [{ key: item.key + 1, value: item.value + "x" }]
            }
            return []
        }
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 3) throw new Error(`Expected 3 items, got ${result.length}`)

    if (result[0].key !== 1 || result[0].value !== "a") {
        throw new Error(`Item 0 incorrect: ${JSON.stringify(result[0])}`)
    }
    if (result[1].key !== 2) {
        throw new Error(`Item 1 key incorrect: ${result[1].key}`)
    }
    if (result[2].key !== 3) {
        throw new Error(`Item 2 key incorrect: ${result[2].key}`)
    }
})

Deno.test("genericClosure - handles graph with branches", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: "a" }],
        operator: (item) => {
            if (item.key === "a") return [{ key: "b" }, { key: "c" }]
            if (item.key === "b") return [{ key: "d" }]
            return []
        }
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 4) throw new Error(`Expected 4 items, got ${result.length}`)

    const keys = result.map(item => item.key)
    const expected = ["a", "b", "c", "d"]
    for (let i = 0; i < expected.length; i++) {
        if (keys[i] !== expected[i]) {
            throw new Error(`Expected key[${i}]="${expected[i]}", got "${keys[i]}"`)
        }
    }
})

Deno.test("genericClosure - deduplicates by key", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: 1 }],
        operator: (item) => {
            // Always try to add items 1 and 2
            return [{ key: 1 }, { key: 2 }]
        }
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    // Should only have 2 items: key=1 (from start) and key=2 (from first expansion)
    // key=1 is not added again because it's already seen
    if (result.length !== 2) throw new Error(`Expected 2 items, got ${result.length}`)

    const keys = result.map(item => item.key)
    if (keys[0] !== 1 || keys[1] !== 2) {
        throw new Error(`Expected keys [1, 2], got [${keys}]`)
    }
})

Deno.test("genericClosure - operator returns multiple items", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: 0 }],
        operator: (item) => {
            if (item.key === 0) {
                return [
                    { key: 1 },
                    { key: 2 },
                    { key: 3 }
                ]
            }
            return []
        }
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 4) throw new Error(`Expected 4 items, got ${result.length}`)

    const keys = result.map(item => item.key)
    if (keys[0] !== 0 || keys[1] !== 1 || keys[2] !== 2 || keys[3] !== 3) {
        throw new Error(`Expected keys [0, 1, 2, 3], got [${keys}]`)
    }
})

Deno.test("genericClosure - handles cycles (self-referential)", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: "x" }],
        operator: (item) => {
            // Always returns the same key - should not infinite loop
            return [{ key: "x" }]
        }
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 1) throw new Error(`Expected 1 item (cycle detected), got ${result.length}`)
    if (result[0].key !== "x") throw new Error(`Expected key="x", got "${result[0].key}"`)
})

Deno.test("genericClosure - key coercion to string", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: 1 }, { key: "1" }],
        operator: (item) => []
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    // Keys 1 and "1" should be treated as the same (both coerced to "1")
    if (result.length !== 1) throw new Error(`Expected 1 item (key dedup), got ${result.length}`)
})

Deno.test("genericClosure - error if item missing key", () => {
    let error = null
    try {
        builtins.genericClosure({
            startSet: [{ value: "no key" }],
            operator: (item) => []
        })
    } catch (e) {
        error = e
    }

    if (!error) throw new Error("Expected error for missing key")
    if (!error.message.includes("key")) {
        throw new Error(`Expected error about 'key', got: ${error.message}`)
    }
})

Deno.test("genericClosure - error if startSet not a list", () => {
    let error = null
    try {
        builtins.genericClosure({
            startSet: { key: 1 },  // Not a list
            operator: (item) => []
        })
    } catch (e) {
        error = e
    }

    if (!error) throw new Error("Expected error for non-list startSet")
})

Deno.test("genericClosure - error if operator not a function", () => {
    let error = null
    try {
        builtins.genericClosure({
            startSet: [{ key: 1 }],
            operator: "not a function"
        })
    } catch (e) {
        error = e
    }

    if (!error) throw new Error("Expected error for non-function operator")
    if (!error.message.includes("operator")) {
        throw new Error(`Expected error about 'operator', got: ${error.message}`)
    }
    if (!error.message.includes("function")) {
        throw new Error(`Expected error about 'function', got: ${error.message}`)
    }
})

Deno.test("genericClosure - error if operator returns non-list", () => {
    let error = null
    try {
        builtins.genericClosure({
            startSet: [{ key: 1 }],
            operator: (item) => ({ key: 2 })  // Returns object instead of list
        })
    } catch (e) {
        error = e
    }

    if (!error) throw new Error("Expected error for operator returning non-list")
})

Deno.test("genericClosure - complex dependency graph", () => {
    // Test a more complex graph structure:
    //     a
    //    / \
    //   b   c
    //  / \ /
    // d   e
    const result = builtins.genericClosure({
        startSet: [{ key: "a" }],
        operator: (item) => {
            if (item.key === "a") return [{ key: "b" }, { key: "c" }]
            if (item.key === "b") return [{ key: "d" }, { key: "e" }]
            if (item.key === "c") return [{ key: "e" }]  // e is reached from both b and c
            return []
        }
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 5) throw new Error(`Expected 5 items, got ${result.length}`)

    const keys = result.map(item => item.key)
    // Order: a, b, c, d, e (BFS order)
    const expected = ["a", "b", "c", "d", "e"]
    for (let i = 0; i < expected.length; i++) {
        if (keys[i] !== expected[i]) {
            throw new Error(`Expected key[${i}]="${expected[i]}", got "${keys[i]}"`)
        }
    }
})

Deno.test("genericClosure - with numeric keys", () => {
    // Test factorial-like expansion: 5 -> 4 -> 3 -> 2 -> 1
    const result = builtins.genericClosure({
        startSet: [{ key: 5, value: 1 }],
        operator: (item) => {
            if (item.key > 1) {
                return [{
                    key: item.key - 1,
                    value: item.value * item.key
                }]
            }
            return []
        }
    })

    if (!Array.isArray(result)) throw new Error("Expected array")
    if (result.length !== 5) throw new Error(`Expected 5 items, got ${result.length}`)

    const keys = result.map(item => item.key)
    const expected = [5, 4, 3, 2, 1]
    for (let i = 0; i < expected.length; i++) {
        if (keys[i] !== expected[i]) {
            throw new Error(`Expected key[${i}]=${expected[i]}, got ${keys[i]}`)
        }
    }
})

console.log("✓ All control flow builtin tests passed!")
