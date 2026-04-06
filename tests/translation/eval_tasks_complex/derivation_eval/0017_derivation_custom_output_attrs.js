#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

const drv = `derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["bin" "lib"]; }`

await expectSuccess({
    expr: `(${drv}).bin.type`,
    pattern: /^"derivation"$/,
    label: "custom output .bin has type derivation",
})

await expectSuccess({
    expr: `(${drv}).lib.type`,
    pattern: /^"derivation"$/,
    label: "custom output .lib has type derivation",
})
