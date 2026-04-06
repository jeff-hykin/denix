#!/usr/bin/env -S deno run --allow-all
// d == d.out → true
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let d = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; in d == d.out`,
    pattern: /^true$/,
    label: "derivation equals its .out output",
})
