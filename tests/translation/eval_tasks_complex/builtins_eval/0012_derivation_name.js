#!/usr/bin/env -S deno run --allow-all
// (builtins.derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).name == "test"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `(builtins.derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).name`],
    expected: `"test"`,
    label: "derivation .name",
})
