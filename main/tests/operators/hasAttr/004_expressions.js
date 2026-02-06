#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.hasAttr - In expressions\n")

// Test 1: In boolean expression (true)
await test(
    1,
    "in boolean and (true)",
    '({a=1;} ? a) && ({b=2;} ? b)',
    operators.and(operators.hasAttr({a: 1n}, "a"), operators.hasAttr({b: 2n}, "b"))
)

// Test 2: In boolean expression (false)
await test(
    2,
    "in boolean and (false)",
    '({a=1;} ? a) && ({b=2;} ? c)',
    operators.and(operators.hasAttr({a: 1n}, "a"), operators.hasAttr({b: 2n}, "c"))
)

// Test 3: In or expression
await test(
    3,
    "in boolean or",
    '({a=1;} ? b) || ({c=2;} ? c)',
    operators.or(operators.hasAttr({a: 1n}, "b"), operators.hasAttr({c: 2n}, "c"))
)

// Test 4: Negated
await test(
    4,
    "negated",
    '!({a=1;} ? b)',
    operators.negate(operators.hasAttr({a: 1n}, "b"))
)

// Test 5: Multiple checks on same attrset
await test(
    5,
    "multiple checks",
    '({a=1; b=2;} ? a) && ({a=1; b=2;} ? b)',
    operators.and(
        operators.hasAttr({a: 1n, b: 2n}, "a"),
        operators.hasAttr({a: 1n, b: 2n}, "b")
    )
)

// Test 6: Check with implication
await test(
    6,
    "with implication",
    '({a=1;} ? a) -> ({b=2;} ? b)',
    operators.implication(operators.hasAttr({a: 1n}, "a"), operators.hasAttr({b: 2n}, "b"))
)

printSummary()
