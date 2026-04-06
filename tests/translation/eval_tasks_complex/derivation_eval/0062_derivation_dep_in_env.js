#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `let a = derivation { name = "a"; system = "x86_64-linux"; builder = "/bin/sh"; }; b = derivation { name = "b"; system = "x86_64-linux"; builder = "/bin/sh"; input = a; }; in builtins.isString b.input`],
    expected: `true`,
    label: "derivation dep in env coerces to string",
})
