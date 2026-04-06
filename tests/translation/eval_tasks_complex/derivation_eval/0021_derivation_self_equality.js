#!/usr/bin/env -S deno run --allow-all
// derivation self-equality: d == d → true
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `let d = derivation { name = "a"; builder = "/foo"; system = "i686-linux"; }; in d == d`,
    pattern: /^true$/,
    label: "derivation self equality",
})
