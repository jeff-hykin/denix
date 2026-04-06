#!/usr/bin/env -S deno run --allow-all
// Auto-generated from pure-eval.sh:7
// nix eval --expr 'assert 1 + 2 == 3; true'

import { bashAssert } from "../../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", "assert 1 + 2 == 3; true"],
    expected: "true",
    label: "assert 1 + 2 == 3; true",
})
