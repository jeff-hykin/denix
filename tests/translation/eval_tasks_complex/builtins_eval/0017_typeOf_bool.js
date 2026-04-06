#!/usr/bin/env -S deno run --allow-all
// builtins.typeOf true == "bool"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.typeOf true`],
    expected: `"bool"`,
    label: "typeOf bool",
})
