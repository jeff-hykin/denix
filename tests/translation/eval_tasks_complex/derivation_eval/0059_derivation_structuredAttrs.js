#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `(derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; __structuredAttrs = true; }).drvPath`,
    pattern: /\/nix\/store\/[a-z0-9]{32}-test\.drv/,
    label: "derivation with __structuredAttrs evaluates",
})
