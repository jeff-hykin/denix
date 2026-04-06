#!/usr/bin/env -S deno run --allow-all
// builtins.hashString "sha1" "abc" == "a9993e364706816aba3e25717850c26c9cd0d89d"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.hashString "sha1" "abc"`],
    expected: `"a9993e364706816aba3e25717850c26c9cd0d89d"`,
    label: "hashString sha1 abc",
})
