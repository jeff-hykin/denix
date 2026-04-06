#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `let d1 = derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }; d2 = derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }; in d1.outPath == d2.outPath`],
    expected: `true`,
    label: "identical derivations have same outPath",
})
