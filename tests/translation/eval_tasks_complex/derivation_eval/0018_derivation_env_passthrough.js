#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `(derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; foo = "bar"; }).foo`,
    pattern: /^"bar"$/,
    label: "custom attribute passes through to derivation",
})
