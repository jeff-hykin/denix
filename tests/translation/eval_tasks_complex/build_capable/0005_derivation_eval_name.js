#!/usr/bin/env -S deno run --allow-all
// Test: Evaluating a derivation returns an attrset with .name

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", '(derivation { name = "hello"; system = "x86_64-linux"; builder = "/bin/sh"; }).name'],
    expected: '"hello"',
    label: "derivation .name",
})
