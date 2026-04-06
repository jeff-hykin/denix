#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `builtins.isAttrs (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; })`,
    pattern: /^true$/,
    label: "derivation creates an attrset",
})
