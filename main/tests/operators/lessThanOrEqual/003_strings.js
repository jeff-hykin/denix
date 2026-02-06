#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.lessThanOrEqual - Strings\n")

// Test 1: Lexicographic (less)
await test(
    1,
    "a <= b",
    '"a" <= "b"',
    operators.lessThanOrEqual("a", "b")
)

// Test 2: Lexicographic (greater)
await test(
    2,
    "b <= a",
    '"b" <= "a"',
    operators.lessThanOrEqual("b", "a")
)

// Test 3: Equal strings
await test(
    3,
    "equal strings",
    '"hello" <= "hello"',
    operators.lessThanOrEqual("hello", "hello")
)

// Test 4: Prefix comparison
await test(
    4,
    "prefix <= longer",
    '"hell" <= "hello"',
    operators.lessThanOrEqual("hell", "hello")
)

// Test 5: Empty strings
await test(
    5,
    "empty <= empty",
    '"" <= ""',
    operators.lessThanOrEqual("", "")
)

// Test 6: Empty <= non-empty
await test(
    6,
    "empty <= non-empty",
    '"" <= "a"',
    operators.lessThanOrEqual("", "a")
)

printSummary()
