#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `builtins.isList (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).all`,
    pattern: /^true$/,
    label: "derivation .all is a list",
})
