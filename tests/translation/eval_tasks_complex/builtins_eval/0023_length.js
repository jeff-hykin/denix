#!/usr/bin/env -S deno run --allow-all
// builtins.length [1 2 3] == 3

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.length [1 2 3]`],
    expected: `3`,
    label: "length of list",
})
