#!/usr/bin/env -S deno run --allow-all
// builtins.map (x: x * 2) [1 2 3] == [ 2 4 6 ]

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.map (x: x * 2) [1 2 3]`],
    expected: `[ 2 4 6 ]`,
    label: "map double",
})
