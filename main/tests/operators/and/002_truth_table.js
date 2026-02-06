#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.and - Truth table\n")

// Complete truth table for AND operation

// Test 1: T && T = T
await test(
    1,
    "T AND T equals T",
    'true && true',
    operators.and(true, true)
)

// Test 2: T && F = F
await test(
    2,
    "T AND F equals F",
    'true && false',
    operators.and(true, false)
)

// Test 3: F && T = F
await test(
    3,
    "F AND T equals F",
    'false && true',
    operators.and(false, true)
)

// Test 4: F && F = F
await test(
    4,
    "F AND F equals F",
    'false && false',
    operators.and(false, false)
)

// Test 5: Verify commutativity with true
await test(
    5,
    "commutativity: true && false == false && true",
    'true && false',
    operators.and(false, true)
)

// Test 6: Identity with true
await test(
    6,
    "identity: x && true == x (for x=true)",
    'true && true',
    operators.and(true, true)
)

// Test 7: Annihilator with false
await test(
    7,
    "annihilator: x && false == false",
    'true && false',
    operators.and(true, false)
)

printSummary()
