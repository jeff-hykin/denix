#!/usr/bin/env -S deno run --allow-all
import { expectFailure } from "../shared_tooling/index.js"

await expectFailure({
    expr: `derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["drv"]; }`,
    pattern: /drv|reserved|illegal/i,
    label: "derivation output name 'drv' is reserved",
})
