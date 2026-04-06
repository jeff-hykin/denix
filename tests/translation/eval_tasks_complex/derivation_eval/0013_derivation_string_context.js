#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `builtins.hasContext (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).outPath`],
    expected: "true",
    label: "derivation .outPath has string context",
})
