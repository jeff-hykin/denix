#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `(derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; }).outPath`,
    pattern: /^"\/nix\/store\/[a-z0-9]{32}-test"$/,
    label: "derivation .outPath matches store path",
})
