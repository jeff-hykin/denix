#!/usr/bin/env -S deno run --allow-all
import { expectSuccess } from "../shared_tooling/index.js"

await expectSuccess({
    expr: `toString (derivation { name = "test"; system = "x86_64-linux"; builder = "/bin/sh"; })`,
    pattern: /\/nix\/store\/[a-z0-9]{32}-test/,
    json: false,
    label: "toString derivation yields store path",
})
