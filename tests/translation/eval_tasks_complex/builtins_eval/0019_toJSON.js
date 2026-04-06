#!/usr/bin/env -S deno run --allow-all
// builtins.toJSON { a = 1; b = "two"; } == "{\"a\":1,\"b\":\"two\"}"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.toJSON { a = 1; b = "two"; }`],
    expected: `"{\\"a\\":1,\\"b\\":\\"two\\"}"`,
    label: "toJSON attrset",
})
