#!/usr/bin/env -S deno run --allow-all
import { expectFailure } from "../shared_tooling/index.js"

await expectFailure({
    expr: `derivation { name = "foo/bar"; system = "x86_64-linux"; builder = "/bin/sh"; }`,
    pattern: /invalid|illegal/i,
    label: "derivation name with slash is rejected",
})
