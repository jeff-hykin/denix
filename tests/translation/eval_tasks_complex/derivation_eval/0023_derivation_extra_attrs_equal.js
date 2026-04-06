#!/usr/bin/env -S deno run --allow-all
// extra attributes don't affect derivation equality
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let d1 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; d2 = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; } // { dummy = 1; }; in d1 == d2`,
    pattern: /^true$/,
    label: "extra attrs do not affect derivation equality",
})
