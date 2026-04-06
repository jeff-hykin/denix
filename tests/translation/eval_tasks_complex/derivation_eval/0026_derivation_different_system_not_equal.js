#!/usr/bin/env -S deno run --allow-all
// different system means not equal
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let d1 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; d2 = derivation { name = "a"; builder = "/foo"; system = "x86_64-linux"; }; in d1 == d2`,
    pattern: /^false$/,
    label: "different system means not equal",
})
