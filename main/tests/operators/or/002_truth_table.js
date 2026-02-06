#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.or - Truth table\n")

// Complete truth table for OR operation

// Test 1: T || T = T
await test(
    1,
    "T OR T equals T",
    'true || true',
    operators.or(true, true)
)

// Test 2: T || F = T
await test(
    2,
    "T OR F equals T",
    'true || false',
    operators.or(true, false)
)

// Test 3: F || T = T
await test(
    3,
    "F OR T equals T",
    'false || true',
    operators.or(false, true)
)

// Test 4: F || F = F
await test(
    4,
    "F OR F equals F",
    'false || false',
    operators.or(false, false)
)

// Test 5: Verify commutativity
await test(
    5,
    "commutativity: true || false == false || true",
    'false || true',
    operators.or(true, false)
)

// Test 6: Identity with false
await test(
    6,
    "identity: x || false == x (for x=true)",
    'true || false',
    operators.or(true, false)
)

// Test 7: Annihilator with true
await test(
    7,
    "annihilator: x || true == true",
    'false || true',
    operators.or(false, true)
)

printSummary()
