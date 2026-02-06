#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.mapAttrs - Basic tests\n")

// Test 1: Simple value transformation
await test(
    1,
    "multiply values by 10",
    'builtins.mapAttrs (name: value: value * 10) {a=1; b=2; c=3;}',
    builtins.mapAttrs((name) => (value) => value * 10n)({ a: 1n, b: 2n, c: 3n })
)

// Test 2: Empty attrset
await test(
    2,
    "empty attrset",
    'builtins.mapAttrs (name: value: value * 10) {}',
    builtins.mapAttrs((name) => (value) => value * 10n)({})
)

// Test 3: Use name in transformation
await test(
    3,
    "use attribute name in value",
    'builtins.mapAttrs (name: value: "${name}=${builtins.toString value}") {x=1; y=2;}',
    builtins.mapAttrs((name) => (value) => `${name}=${builtins.toString(value)}`)({ x: 1n, y: 2n })
)

// Test 4: Boolean values
await test(
    4,
    "negate boolean values",
    'builtins.mapAttrs (name: value: !value) {a=true; b=false; c=true;}',
    builtins.mapAttrs((name) => (value) => !value)({ a: true, b: false, c: true })
)

// Test 5: String transformation
await test(
    5,
    "append suffix to strings",
    'builtins.mapAttrs (name: value: "${value}-modified") {foo="bar"; baz="qux";}',
    builtins.mapAttrs((name) => (value) => `${value}-modified`)({ foo: "bar", baz: "qux" })
)

// Test 6: Nested structures
await test(
    6,
    "extract nested values",
    'builtins.mapAttrs (name: value: value.x) {a={x=1;}; b={x=2;};}',
    builtins.mapAttrs((name) => (value) => value.x)({ a: { x: 1n }, b: { x: 2n } })
)

// Test 7: Return constants
await test(
    7,
    "map all to constant",
    'builtins.mapAttrs (name: value: 42) {a=1; b=2; c=3;}',
    builtins.mapAttrs((name) => (value) => 42n)({ a: 1n, b: 2n, c: 3n })
)

printSummary()
