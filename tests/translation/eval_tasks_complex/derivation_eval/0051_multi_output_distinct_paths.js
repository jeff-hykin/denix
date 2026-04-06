#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `let d = derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["bin" "lib"]; }; in d.bin.outPath != d.lib.outPath`],
    expected: `true`,
    label: "multi output distinct paths",
})
