#!/usr/bin/env -S deno run --allow-all
// builtins.typeOf { } == "set"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.typeOf { }`],
    expected: `"set"`,
    label: "typeOf set",
})
