#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `builtins.length (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["a" "b" "c"]; }).all`],
    expected: `3`,
    label: "multi output all length",
})
