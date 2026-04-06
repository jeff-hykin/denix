#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `builtins.isAttrs (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }) && (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).type == "derivation"`,
    pattern: /^true$/,
    label: "derivation is an attrset with type 'derivation'",
})
