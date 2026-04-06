#!/usr/bin/env -S deno run --allow-all
import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", `let d1 = derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; args = ["-c" "echo a"]; }; d2 = derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; args = ["-c" "echo b"]; }; in d1.outPath != d2.outPath`],
    expected: `true`,
    label: "different args produce different outPath",
})
