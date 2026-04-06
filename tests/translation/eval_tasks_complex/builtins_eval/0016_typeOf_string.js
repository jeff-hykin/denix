#!/usr/bin/env -S deno run --allow-all
// builtins.typeOf "hello" == "string"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.typeOf "hello"`],
    expected: `"string"`,
    label: "typeOf string",
})
