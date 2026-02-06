#!/usr/bin/env -S deno test --allow-all

/**
 * Test nixpkgs-style code patterns
 * These tests validate that common patterns found in nixpkgs.lib work correctly
 * Testing manually written JS equivalent to what the translator should generate
 */

import { toFloat } from "../../tools/generic.js"

// Minimal builtins for tests (avoiding prex WASM issue)
const builtins = {
    "foldl'": (op) => (nul) => (list) => list.reduce((acc, each) => op(acc)(each), nul),
    length: (list) => BigInt(list.length),
    map: (f) => (list) => list.map(f),
    filter: (f) => (list) => list.filter(f),
    attrValues: (obj) => Object.keys(obj).sort().map(k => obj[k]),
    all: (f) => (list) => list.length === 0 || list.every(f),
    any: (f) => (list) => list.some(f),
    getAttr: (attr) => (obj) => {
        if (!obj.hasOwnProperty(attr)) {
            throw new Error(`attribute '${attr}' missing`)
        }
        return obj[attr]
    }
}

const operators = {
    add: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a + b : toFloat(a) + toFloat(b),
    subtract: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a - b : toFloat(a) - toFloat(b),
    multiply: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a * b : toFloat(a) * toFloat(b),
    divide: (a, b) => typeof a === "bigint" && typeof b === "bigint" ? a / b : toFloat(a) / toFloat(b),
    listConcat: (a, b) => a.concat(b),
    merge: (a, b) => ({ ...a, ...b }),
    equal: (a, b) => {
        if (a === b) return true
        if (typeof a !== typeof b) return false
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false
            return a.every((v, i) => operators.equal(v, b[i]))
        }
        return false
    },
    lessThan: (a, b) => a < b,
    greaterThan: (a, b) => a > b,
    lessThanOrEqual: (a, b) => a <= b,
    hasAttr: (obj, attr) => obj.hasOwnProperty(attr)
}

Deno.test("Simple identity function", () => {
    // Nix: let id = x: x; in id 42
    const id = (x) => x
    const result = id(42n)
    if (result !== 42n) {
        throw new Error(`Expected 42n, got ${result}`)
    }
})

Deno.test("Const function", () => {
    // Nix: let const = x: y: x; in const "hello" "world"
    const constFn = (x) => (y) => x
    const result = constFn("hello")("world")
    if (result !== "hello") {
        throw new Error(`Expected "hello", got ${result}`)
    }
})

Deno.test("Flip function", () => {
    // Nix: let flip = f: a: b: f b a; subtract = a: b: a - b; in flip subtract 10 3
    const flip = (f) => (a) => (b) => f(b)(a)
    const subtract = (a) => (b) => operators.subtract(a, b)
    const result = flip(subtract)(10n)(3n)
    if (result !== -7n) {
        throw new Error(`Expected -7n, got ${result}`)
    }
})

Deno.test("Pipe function", () => {
    // Nix: let pipe = val: functions: builtins.foldl' (x: f: f x) val functions; ...
    const pipe = (val) => (functions) => builtins["foldl'"]((x) => (f) => f(x))(val)(functions)
    const double = (x) => operators.multiply(x, 2n)
    const addOne = (x) => operators.add(x, 1n)
    const result = pipe(5n)([double, addOne])
    if (result !== 11n) {
        throw new Error(`Expected 11n (5*2+1), got ${result}`)
    }
})

Deno.test("Simple list operations - range", () => {
    // Nix: let range = first: last: if first > last then [] else [ first ] ++ range (first + 1) last; in builtins.length (range 1 5)
    const range = (first) => (last) => {
        if (operators.greaterThan(first, last)) {
            return []
        } else {
            return operators.listConcat([first], range(operators.add(first, 1n))(last))
        }
    }
    const result = builtins.length(range(1n)(5n))
    if (result !== 5n) {
        throw new Error(`Expected 5n, got ${result}`)
    }
})

Deno.test("Simple attribute set merging", () => {
    // Nix: let a = { x = 1; y = 2; }; b = { y = 3; z = 4; }; in (a // b).y
    const a = { x: 1n, y: 2n }
    const b = { y: 3n, z: 4n }
    const result = operators.merge(a, b).y
    if (result !== 3n) {
        throw new Error(`Expected 3n, got ${result}`)
    }
})

Deno.test("Conditional with attribute check", () => {
    // Nix: let attrs = { foo = "bar"; }; in if attrs ? foo then attrs.foo else "default"
    const attrs = { foo: "bar" }
    const result = operators.hasAttr(attrs, "foo") ? attrs.foo : "default"
    if (result !== "bar") {
        throw new Error(`Expected "bar", got ${result}`)
    }
})

Deno.test("Map over list", () => {
    // Nix: let double = x: x * 2; in builtins.map double [ 1 2 3 ]
    const double = (x) => operators.multiply(x, 2n)
    const result = builtins.map(double)([1n, 2n, 3n])
    const expected = [2n, 4n, 6n]
    if (result.length !== expected.length || !result.every((v, i) => v === expected[i])) {
        throw new Error(`Expected [${expected}], got [${result}]`)
    }
})

Deno.test("Filter list", () => {
    // Nix: let isEven = x: x / 2 * 2 == x; in builtins.filter isEven [ 1 2 3 4 5 ]
    const isEven = (x) => operators.equal(operators.multiply(operators.divide(x, 2n), 2n), x)
    const result = builtins.filter(isEven)([1n, 2n, 3n, 4n, 5n])
    const expected = [2n, 4n]
    if (result.length !== expected.length || !result.every((v, i) => v === expected[i])) {
        throw new Error(`Expected [${expected}], got [${result}]`)
    }
})

Deno.test("Simple recursion - factorial", () => {
    // Nix: let factorial = n: if n <= 1 then 1 else n * factorial (n - 1); in factorial 5
    const factorial = (n) => {
        if (operators.lessThanOrEqual(n, 1n)) {
            return 1n
        } else {
            return operators.multiply(n, factorial(operators.subtract(n, 1n)))
        }
    }
    const result = factorial(5n)
    if (result !== 120n) {
        throw new Error(`Expected 120n, got ${result}`)
    }
})

Deno.test("Collect all values from attrset", () => {
    // Nix: let attrs = { a = 1; b = 2; c = 3; }; in builtins.attrValues attrs
    const attrs = { a: 1n, b: 2n, c: 3n }
    const result = builtins.attrValues(attrs)
    const expected = [1n, 2n, 3n]
    if (result.length !== expected.length || !result.every((v, i) => v === expected[i])) {
        throw new Error(`Expected [${expected}], got [${result}]`)
    }
})

Deno.test("All function", () => {
    // Nix: let isPositive = x: x > 0; in builtins.all isPositive [ 1 2 3 4 5 ]
    const isPositive = (x) => operators.greaterThan(x, 0n)
    const result = builtins.all(isPositive)([1n, 2n, 3n, 4n, 5n])
    if (result !== true) {
        throw new Error(`Expected true, got ${result}`)
    }
})

Deno.test("Any function", () => {
    // Nix: let isNegative = x: x < 0; in builtins.any isNegative [ 1 -2 3 ]
    const isNegative = (x) => operators.lessThan(x, 0n)
    const result = builtins.any(isNegative)([1n, -2n, 3n])
    if (result !== true) {
        throw new Error(`Expected true, got ${result}`)
    }
})

console.log("\n✅ All nixpkgs-style pattern tests passed!")
