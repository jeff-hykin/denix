#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `(derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).outputName`,
    pattern: /^"out"$/,
    label: "derivation .outputName is \"out\"",
})
