#!/usr/bin/env -S deno run --allow-all
// different name means not equal
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let d1 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; d2 = derivation { name = "b"; builder = "/foo"; system = "i686-linux"; }; in d1 == d2`,
    pattern: /^false$/,
    label: "different name means not equal",
})
