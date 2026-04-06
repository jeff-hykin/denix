#!/usr/bin/env -S deno run --allow-all
import { expectFailure } from "../shared_tooling/index.js"

await expectFailure({
    expr: `derivation { name = ""; system = "x86_64-linux"; builder = "/bin/sh"; }`,
    pattern: /invalid|illegal|empty/i,
    label: "derivation with empty name is rejected",
})
