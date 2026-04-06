#!/usr/bin/env -S deno run --allow-all
import { expectFailure } from "../shared_tooling/index.js"

await expectFailure({
    expr: `derivation { name = ".hidden"; system = "x86_64-linux"; builder = "/bin/sh"; }`,
    pattern: /invalid|illegal|name/i,
    label: "derivation name starting with dot is rejected",
})
