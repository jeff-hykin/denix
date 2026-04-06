#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `builtins.isAttrs (builtins.derivationStrict { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; })`],
    expected: `true`,
    label: "derivationStrict returns attrset",
})
