#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `(derivation { name = "test"; system = "x86_64-linux"; builder = builtins.toFile "builder.sh" "echo hello"; }).builder`,
    pattern: /\/nix\/store\/[a-z0-9]{32}-builder\.sh/,
    label: "toFile used as builder arg",
})
