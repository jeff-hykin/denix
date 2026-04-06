#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `(derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["bin" "lib" "dev"]; }).bin.outPath`,
    pattern: /\/nix\/store\/[a-z0-9]{32}-test-bin/,
    label: "multi output bin outPath is valid store path",
})
