#!/usr/bin/env -S deno run --allow-all
// builtins.typeOf 1 == "int"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.typeOf 1`],
    expected: `"int"`,
    label: "typeOf int",
})
