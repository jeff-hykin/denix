#!/usr/bin/env -S deno run --allow-all
import { expectFailure } from "../shared_tooling/index.js"

await expectFailure({
    expr: `derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = "out"; }`,
    pattern: /list|string/i,
    label: "derivation outputs must be a list",
})
