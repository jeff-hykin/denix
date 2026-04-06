#!/usr/bin/env -S deno run --allow-all
// builtins.attrValues { a = 1; b = 2; } == [ 1 2 ]

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.attrValues { a = 1; b = 2; }`],
    expected: `[ 1 2 ]`,
    label: "attrValues sorted by key",
})
