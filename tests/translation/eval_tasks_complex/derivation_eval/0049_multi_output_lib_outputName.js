#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `(derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["bin" "lib" "dev"]; }).lib.outputName`],
    expected: `"lib"`,
    label: "multi output lib outputName",
})
