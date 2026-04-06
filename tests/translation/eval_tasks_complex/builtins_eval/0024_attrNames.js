#!/usr/bin/env -S deno run --allow-all
// builtins.attrNames { b = 2; a = 1; } == [ "a" "b" ]

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.attrNames { b = 2; a = 1; }`],
    expected: `[ "a" "b" ]`,
    label: "attrNames sorted",
})
