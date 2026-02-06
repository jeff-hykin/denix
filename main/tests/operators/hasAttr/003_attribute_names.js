#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.hasAttr - Attribute name variations\n")

// Test 1: Single letter name
await test(
    1,
    "single letter",
    '{a=1;} ? a',
    operators.hasAttr({a: 1n}, "a")
)

// Test 2: Long name
await test(
    2,
    "long name",
    '{veryLongAttributeName=1;} ? veryLongAttributeName',
    operators.hasAttr({veryLongAttributeName: 1n}, "veryLongAttributeName")
)

// Test 3: Name with underscores
await test(
    3,
    "with underscores",
    '{my_attr=1;} ? my_attr',
    operators.hasAttr({my_attr: 1n}, "my_attr")
)

// Test 4: Name with numbers
await test(
    4,
    "with numbers",
    '{attr123=1;} ? attr123',
    operators.hasAttr({attr123: 1n}, "attr123")
)

// Test 5: CamelCase name
await test(
    5,
    "camelCase",
    '{myAttribute=1;} ? myAttribute',
    operators.hasAttr({myAttribute: 1n}, "myAttribute")
)

// Test 6: Name starting with underscore
await test(
    6,
    "starting with underscore",
    '{_private=1;} ? _private',
    operators.hasAttr({_private: 1n}, "_private")
)

// Test 7: Similar names (case sensitive)
await test(
    7,
    "case sensitivity",
    '{Attr=1; attr=2;} ? Attr',
    operators.hasAttr({Attr: 1n, attr: 2n}, "Attr")
)

printSummary()
