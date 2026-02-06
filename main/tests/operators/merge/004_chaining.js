#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../runtime.js", import.meta.url).pathname
const { operators } = await import(runtimePath)

console.log("Testing operators.merge - Chaining\n")

// Test 1: Three-way merge
await test(
    1,
    "three-way merge",
    '{a=1;} // {b=2;} // {c=3;}',
    operators.merge(operators.merge({a: 1n}, {b: 2n}), {c: 3n})
)

// Test 2: Chained overwrites
await test(
    2,
    "chained overwrites",
    '{a=1;} // {a=2;} // {a=3;}',
    operators.merge(operators.merge({a: 1n}, {a: 2n}), {a: 3n})
)

// Test 3: Accumulating merge
await test(
    3,
    "accumulating merge",
    '{a=1;} // {b=2;} // {c=3;} // {d=4;}',
    operators.merge(
        operators.merge(
            operators.merge({a: 1n}, {b: 2n}),
            {c: 3n}
        ),
        {d: 4n}
    )
)

// Test 4: Mixed operations
await test(
    4,
    "mixed operations",
    '{a=1; b=2;} // {b=20;} // {c=3;}',
    operators.merge(operators.merge({a: 1n, b: 2n}, {b: 20n}), {c: 3n})
)

// Test 5: Empty in chain
await test(
    5,
    "empty in chain",
    '{a=1;} // {} // {b=2;}',
    operators.merge(operators.merge({a: 1n}, {}), {b: 2n})
)

// Test 6: Long chain
await test(
    6,
    "long chain",
    '{} // {a=1;} // {b=2;} // {c=3;} // {d=4;} // {e=5;}',
    operators.merge(
        operators.merge(
            operators.merge(
                operators.merge(
                    operators.merge({}, {a: 1n}),
                    {b: 2n}
                ),
                {c: 3n}
            ),
            {d: 4n}
        ),
        {e: 5n}
    )
)

printSummary()
