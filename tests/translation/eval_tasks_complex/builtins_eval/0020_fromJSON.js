#!/usr/bin/env -S deno run --allow-all
// (builtins.fromJSON "{\"x\":42}").x == 42

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `(builtins.fromJSON "{\\"x\\":42}").x`],
    expected: `42`,
    label: "fromJSON .x",
})
