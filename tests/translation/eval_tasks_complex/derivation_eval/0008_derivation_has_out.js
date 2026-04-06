#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `builtins.isAttrs (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).out`,
    pattern: /^true$/,
    label: "derivation .out is an attrset",
})

await expectSuccess({
    expr: `(derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).out ? "outPath"`,
    pattern: /^true$/,
    label: "derivation .out has .outPath",
})
