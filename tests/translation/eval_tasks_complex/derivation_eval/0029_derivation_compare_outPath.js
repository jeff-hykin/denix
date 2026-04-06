#!/usr/bin/env -S deno run --allow-all
// d.outPath == d.out.outPath → true
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let d = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; in d.outPath == d.out.outPath`,
    pattern: /^true$/,
    label: "derivation outPath equals out.outPath",
})
