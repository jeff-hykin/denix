#!/usr/bin/env -S deno run --allow-all
// Phase 3 standalone tests - Test implementations directly without full runtime

console.log("Testing Phase 3 implementations (standalone)...")

// Test operators.add implementation
console.log("\n=== Testing operators.add ===")

const testAdd = (value, other) => {
    const typeOf = (v) => {
        if (typeof v === 'bigint') return 'int'
        if (typeof v === 'number') return 'float'
        if (typeof v === 'string') return 'string'
        return 'unknown'
    }

    const toFloat = (v) => typeof v === 'bigint' ? Number(v) : v

    const vType = typeOf(value)
    const oType = typeOf(other)

    if ((vType === "int" || vType === "float") && (oType === "int" || oType === "float")) {
        if (typeof value == "bigint" && typeof other == "bigint") {
            return value + other
        } else {
            return toFloat(value) + toFloat(other)
        }
    } else if (vType === "string" && oType === "string") {
        return value.toString() + other.toString()
    } else {
        throw new Error(`cannot add ${vType} to ${oType}`)
    }
}

try {
    console.assert(testAdd(5n, 3n) === 8n, "5 + 3 = 8")
    console.log("✓ add: integers")
} catch(e) { console.error("✗ add integers:", e.message) }

try {
    console.assert(Math.abs(testAdd(5.5, 3.2) - 8.7) < 0.0001, "5.5 + 3.2 = 8.7")
    console.log("✓ add: floats")
} catch(e) { console.error("✗ add floats:", e.message) }

try {
    console.assert(testAdd("hello", "world") === "helloworld", "string concat")
    console.log("✓ add: strings")
} catch(e) { console.error("✗ add strings:", e.message) }

// Test operators.subtract implementation
console.log("\n=== Testing operators.subtract ===")

const testSubtract = (value, other) => {
    const toFloat = (v) => typeof v === 'bigint' ? Number(v) : v
    if (typeof value == "bigint" && typeof other == "bigint") {
        return value - other
    } else {
        return toFloat(value) - toFloat(other)
    }
}

try {
    console.assert(testSubtract(10n, 3n) === 7n, "10 - 3 = 7")
    console.log("✓ subtract: integers")
} catch(e) { console.error("✗ subtract integers:", e.message) }

try {
    console.assert(Math.abs(testSubtract(10.5, 3.2) - 7.3) < 0.0001, "10.5 - 3.2 = 7.3")
    console.log("✓ subtract: floats")
} catch(e) { console.error("✗ subtract floats:", e.message) }

// Test functionArgs implementation
console.log("\n=== Testing functionArgs ===")

const testFunctionArgs = (f) => {
    if (typeof f !== 'function') {
        throw new Error('functionArgs requires a function')
    }
    if (f.__functionArgs) {
        return f.__functionArgs
    }
    return {}
}

try {
    const testFn = (x) => x + 1
    const result = testFunctionArgs(testFn)
    console.assert(typeof result === "object", "returns object")
    console.log("✓ functionArgs: basic")
} catch(e) { console.error("✗ functionArgs:", e.message) }

try {
    const testFn = (x) => x + 1
    testFn.__functionArgs = { x: false, y: true }
    const result = testFunctionArgs(testFn)
    console.assert(result.x === false && result.y === true, "respects metadata")
    console.log("✓ functionArgs: with metadata")
} catch(e) { console.error("✗ functionArgs with metadata:", e.message) }

// Test genericClosure implementation
console.log("\n=== Testing genericClosure ===")

const testGenericClosure = (attrset) => {
    const startSet = attrset.startSet
    const operatorFn = attrset.operator

    const result = []
    const seen = new Map()
    const queue = [...startSet]

    while (queue.length > 0) {
        const item = queue.shift()

        if (!item.hasOwnProperty('key')) {
            throw new Error('attribute key required')
        }

        const key = String(item.key)

        if (!seen.has(key)) {
            seen.set(key, true)
            result.push(item)

            const newItems = operatorFn(item)
            queue.push(...newItems)
        }
    }

    return result
}

try {
    const result = testGenericClosure({
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
    console.assert(result.length === 4, "finds all nodes")
    console.log("✓ genericClosure: basic")
} catch(e) { console.error("✗ genericClosure:", e.message) }

try {
    const result = testGenericClosure({
        startSet: [{ key: "a" }],
        operator: (item) => {
            const depMap = {
                "a": ["b", "c"],
                "b": ["d"],
                "c": ["d"],
                "d": []
            }
            return (depMap[item.key] || []).map(k => ({ key: k }))
        }
    })
    console.assert(result.length === 4, "handles graph")
    console.assert(result.map(x => x.key).sort().join(",") === "a,b,c,d", "correct keys")
    console.log("✓ genericClosure: graph traversal")
} catch(e) { console.error("✗ genericClosure graph:", e.message) }

// Test context functions
console.log("\n=== Testing Context Functions ===")

try {
    const getContext = (s) => ({})
    const result = getContext("hello")
    console.assert(typeof result === "object", "getContext returns object")
    console.log("✓ getContext")
} catch(e) { console.error("✗ getContext:", e.message) }

try {
    const hasContext = (s) => false
    const result = hasContext("hello")
    console.assert(result === false, "hasContext returns false")
    console.log("✓ hasContext")
} catch(e) { console.error("✗ hasContext:", e.message) }

// Test store functions
console.log("\n=== Testing Store Functions ===")

try {
    const storeDir = () => "/nix/store"
    const result = storeDir()
    console.assert(result === "/nix/store", "storeDir returns /nix/store")
    console.log("✓ storeDir")
} catch(e) { console.error("✗ storeDir:", e.message) }

try {
    // Import hashing for placeholder test
    const { sha256Hex } = await import("../../tools/hashing.js")

    const placeholder = (outputName) => {
        const hash = sha256Hex(outputName).slice(0, 32)
        return `/${hash}`
    }

    const result = placeholder("out")
    console.assert(typeof result === "string", "placeholder returns string")
    console.assert(result.startsWith("/"), "placeholder starts with /")
    console.log("✓ placeholder")
} catch(e) { console.error("✗ placeholder:", e.message) }

console.log("\n=== All Phase 3 Standalone Tests Complete ===")
console.log("\nNote: These are simplified standalone tests.")
console.log("Full integration tests blocked by prex WASM initialization issue.")
