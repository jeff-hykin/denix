#!/usr/bin/env -S deno run --allow-all
// Test: Evaluating a derivation returns .type == "derivation"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", '(derivation { name = "hello"; system = "x86_64-linux"; builder = "/bin/sh"; }).type'],
    expected: '"derivation"',
    label: "derivation .type",
})
