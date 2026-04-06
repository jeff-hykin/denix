#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `let a = derivation { name = "a"; system = "x86_64-linux"; builder = "/bin/sh"; }; b = derivation { name = "b"; system = "x86_64-linux"; builder = "/bin/sh"; args = [a.outPath]; }; in builtins.length b.args`],
    expected: `1`,
    label: "derivation dep in args",
})
