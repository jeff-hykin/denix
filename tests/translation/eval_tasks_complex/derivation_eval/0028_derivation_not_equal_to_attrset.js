#!/usr/bin/env -S deno run --allow-all
// a derivation is not equal to a plain attrset
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `derivation { name = "a"; builder = "/foo"; system = "i686-linux"; } == { type = "derivation"; }`,
    pattern: /^false$/,
    label: "derivation not equal to plain attrset",
})
