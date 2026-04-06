#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: [
        "--eval", "--json", "--expr",
        `builtins.attrNames (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; })`,
    ],
    expected: `["all","builder","drvAttrs","drvPath","name","out","outPath","outputName","outputs","system","type"]`,
    label: "derivation attrNames includes expected attributes",
})
