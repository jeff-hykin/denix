#!/usr/bin/env -S deno run --allow-all
// Standalone test for has-attr functionality

console.log("Testing has-attr expressions (standalone)...")

// Standalone implementation of hasAttr
const hasAttr = (attrset, attr) => {
    if (typeof attrset !== "object" || attrset === null || Array.isArray(attrset)) {
        throw new Error(`hasAttr expects an attribute set, got ${typeof attrset}`)
    }
    if (typeof attr !== "string") {
        throw new Error(`hasAttr expects a string attribute name, got ${typeof attr}`)
    }
    return attrset.hasOwnProperty(attr.toString())
}

// Standalone implementation of hasAttrPath
const hasAttrPath = (attrset, ...attrPath) => {
    let current = attrset
    for (const attr of attrPath) {
        if (typeof current !== "object" || current === null || Array.isArray(current)) {
            return false
        }
        const attrStr = (typeof attr === "string") ? attr : attr.toString()
        if (!current.hasOwnProperty(attrStr)) {
            return false
        }
        current = current[attrStr]
    }
    return true
}

let passed = 0
let failed = 0

function test(description, fn) {
    try {
        fn()
        console.log(`✓ ${description}`)
        passed++
    } catch (e) {
        console.error(`✗ ${description}: ${e.message}`)
        failed++
    }
}

// Test hasAttr (simple case)
console.log("\n=== Testing hasAttr ===")
const simpleObj = { a: 1, b: 2 }

test("hasAttr finds existing attribute", () => {
    if (hasAttr(simpleObj, "a") !== true) {
        throw new Error("Should find existing attr 'a'")
    }
})

test("hasAttr returns false for missing attribute", () => {
    if (hasAttr(simpleObj, "c") !== false) {
        throw new Error("Should not find missing attr 'c'")
    }
})

// Test hasAttrPath (nested paths)
console.log("\n=== Testing hasAttrPath ===")
const nestedObj = { a: { b: { c: 42 } } }

test("hasAttrPath finds deeply nested path", () => {
    if (hasAttrPath(nestedObj, "a", "b", "c") !== true) {
        throw new Error("Should find nested path a.b.c")
    }
})

test("hasAttrPath returns false for missing nested attribute", () => {
    if (hasAttrPath(nestedObj, "a", "b", "d") !== false) {
        throw new Error("Should not find missing nested attr")
    }
})

test("hasAttrPath returns false when intermediate path is missing", () => {
    if (hasAttrPath(nestedObj, "a", "x", "y") !== false) {
        throw new Error("Should return false when path partially exists")
    }
})

const partialObj = { a: 1 }
test("hasAttrPath returns false when intermediate value is not an object", () => {
    if (hasAttrPath(partialObj, "a", "b") !== false) {
        throw new Error("Should return false when trying to access property of non-object")
    }
})

test("hasAttrPath works with dynamic attribute names", () => {
    const dynamicKey = "b"
    if (hasAttrPath(nestedObj, "a", dynamicKey, "c") !== true) {
        throw new Error("Should work with dynamic attribute names")
    }
})

test("hasAttrPath handles empty object", () => {
    if (hasAttrPath({}, "a") !== false) {
        throw new Error("Should return false for empty object")
    }
})

test("hasAttrPath works with single-level path", () => {
    const singleLevel = { x: 5 }
    if (hasAttrPath(singleLevel, "x") !== true) {
        throw new Error("Should work with single-level path")
    }
})

test("hasAttrPath finds attribute with null value", () => {
    const withNull = { a: null }
    if (hasAttrPath(withNull, "a") !== true) {
        throw new Error("Should find attribute even if value is null")
    }
})

test("hasAttrPath returns false when trying to descend into null", () => {
    const withNull = { a: null }
    if (hasAttrPath(withNull, "a", "b") !== false) {
        throw new Error("Should return false when trying to access property of null")
    }
})

test("hasAttrPath returns false for arrays", () => {
    const withArray = { a: [1, 2, 3] }
    if (hasAttrPath(withArray, "a", "0") !== false) {
        throw new Error("Should return false for array indices")
    }
})

// Test with Nix-style behavior
console.log("\n=== Testing Nix-like scenarios ===")

test("Nested check with all levels present", () => {
    const obj = { foo: { bar: { baz: "value" } } }
    if (hasAttrPath(obj, "foo", "bar", "baz") !== true) {
        throw new Error("Should find foo.bar.baz")
    }
})

test("Nested check missing final level", () => {
    const obj = { foo: { bar: { baz: "value" } } }
    if (hasAttrPath(obj, "foo", "bar", "qux") !== false) {
        throw new Error("Should not find foo.bar.qux")
    }
})

test("Interpolated attribute name simulation", () => {
    const attrName = "bar"
    const obj = { foo: { bar: 42 } }
    if (hasAttrPath(obj, "foo", attrName) !== true) {
        throw new Error("Should handle dynamic attribute names")
    }
})

console.log(`\n${'='.repeat(60)}`)
console.log(`Results: ${passed} passed, ${failed} failed`)
console.log(`${'='.repeat(60)}`)

if (failed > 0) {
    Deno.exit(1)
}
