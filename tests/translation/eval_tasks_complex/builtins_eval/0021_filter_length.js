#!/usr/bin/env -S deno run --allow-all
// builtins.length (builtins.filter (x: x > 2) [1 2 3 4 5]) == 3

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.length (builtins.filter (x: x > 2) [1 2 3 4 5])`],
    expected: `3`,
    label: "filter then length",
})
