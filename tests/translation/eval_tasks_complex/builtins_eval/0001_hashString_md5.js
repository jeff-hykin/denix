#!/usr/bin/env -S deno run --allow-all
// builtins.hashString "md5" "" == "d41d8cd98f00b204e9800998ecf8427e"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.hashString "md5" ""`],
    expected: `"d41d8cd98f00b204e9800998ecf8427e"`,
    label: "hashString md5 empty string",
})
