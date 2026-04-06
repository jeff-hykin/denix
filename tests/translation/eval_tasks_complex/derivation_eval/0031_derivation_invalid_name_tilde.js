#!/usr/bin/env -S deno run --allow-all
import { expectFailure } from "../shared_tooling/index.js"

await expectFailure({
    expr: `derivation { name = "~jiggle~"; system = "some-system"; builder = "/dontcare"; }`,
    pattern: /invalid|illegal/i,
    label: "derivation name with tilde is rejected",
})
