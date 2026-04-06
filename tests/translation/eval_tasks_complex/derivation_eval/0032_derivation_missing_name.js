#!/usr/bin/env -S deno run --allow-all
import { expectFailure } from "../shared_tooling/index.js"

await expectFailure({
    expr: `derivation { system = "x86_64-linux"; builder = "/bin/sh"; }`,
    pattern: /name/i,
    label: "derivation missing name attribute",
})
