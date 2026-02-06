// Test suite for has-attr expressions (nested and interpolated)
import { operators } from "../runtime.js"

console.log("\nTesting has-attr expressions\n")

// Test operators.hasAttr (simple case)
console.log("Testing operators.hasAttr:")
const simpleObj = { a: 1, b: 2 }

if (operators.hasAttr(simpleObj, "a") !== true) {
    throw new Error("hasAttr should find existing attr 'a'")
}
console.log("✓ hasAttr finds existing attribute")

if (operators.hasAttr(simpleObj, "c") !== false) {
    throw new Error("hasAttr should not find missing attr 'c'")
}
console.log("✓ hasAttr returns false for missing attribute")

// Test operators.hasAttrPath (nested paths)
console.log("\nTesting operators.hasAttrPath:")
const nestedObj = { a: { b: { c: 42 } } }

if (operators.hasAttrPath(nestedObj, "a", "b", "c") !== true) {
    throw new Error("hasAttrPath should find nested path a.b.c")
}
console.log("✓ hasAttrPath finds deeply nested path")

if (operators.hasAttrPath(nestedObj, "a", "b", "d") !== false) {
    throw new Error("hasAttrPath should not find missing nested attr")
}
console.log("✓ hasAttrPath returns false for missing nested attribute")

if (operators.hasAttrPath(nestedObj, "a", "x", "y") !== false) {
    throw new Error("hasAttrPath should return false when path partially exists")
}
console.log("✓ hasAttrPath returns false when intermediate path is missing")

// Test with value that's not an object at intermediate level
const partialObj = { a: 1 }
if (operators.hasAttrPath(partialObj, "a", "b") !== false) {
    throw new Error("hasAttrPath should return false when trying to access property of non-object")
}
console.log("✓ hasAttrPath returns false when intermediate value is not an object")

// Test with interpolated (dynamic) attribute names
const dynamicKey = "b"
if (operators.hasAttrPath(nestedObj, "a", dynamicKey, "c") !== true) {
    throw new Error("hasAttrPath should work with dynamic attribute names")
}
console.log("✓ hasAttrPath works with dynamic attribute names")

// Test edge cases
if (operators.hasAttrPath({}, "a") !== false) {
    throw new Error("hasAttrPath should return false for empty object")
}
console.log("✓ hasAttrPath handles empty object")

const singleLevel = { x: 5 }
if (operators.hasAttrPath(singleLevel, "x") !== true) {
    throw new Error("hasAttrPath should work with single-level path")
}
console.log("✓ hasAttrPath works with single-level path")

// Test with null values
const withNull = { a: null }
if (operators.hasAttrPath(withNull, "a") !== true) {
    throw new Error("hasAttrPath should find attribute even if value is null")
}
console.log("✓ hasAttrPath finds attribute with null value")

if (operators.hasAttrPath(withNull, "a", "b") !== false) {
    throw new Error("hasAttrPath should return false when trying to access property of null")
}
console.log("✓ hasAttrPath returns false when trying to descend into null")

// Test with arrays (should return false)
const withArray = { a: [1, 2, 3] }
if (operators.hasAttrPath(withArray, "a", "0") !== false) {
    throw new Error("hasAttrPath should return false for array indices")
}
console.log("✓ hasAttrPath returns false for arrays")

console.log("\n✅ All has-attr tests passed!\n")
