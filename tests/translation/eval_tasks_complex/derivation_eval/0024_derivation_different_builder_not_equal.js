#!/usr/bin/env -S deno run --allow-all
// different builder means not equal
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let d1 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; d2 = derivation { name = "a"; builder = "/bar"; system = "i686-linux"; }; in d1 == d2`,
    pattern: /^false$/,
    label: "different builder means not equal",
})
