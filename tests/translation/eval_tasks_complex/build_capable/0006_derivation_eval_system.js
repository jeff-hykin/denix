#!/usr/bin/env -S deno run --allow-all
// Test: Evaluating a derivation returns .system

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--json", "--expr", '(derivation { name = "hello"; system = "aarch64-darwin"; builder = "/bin/sh"; }).system'],
    expected: '"aarch64-darwin"',
    label: "derivation .system",
})
