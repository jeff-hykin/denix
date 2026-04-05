#!/usr/bin/env -S deno run --allow-all
// _self_test.js — smoke-test the shared_tooling helpers against a
// trivially-passable expression. Exits 0 if the harness plumbing works.
//
// Not a product test; this validates the framework itself.

import { expectSuccess, expectFailure } from "./index.js"

await expectSuccess({
    expr: `1 + 2`,
    pattern: /^3$/,
    label: "arithmetic 1+2 == 3",
})

await expectSuccess({
    expr: `"hello"`,
    pattern: /"hello"/,
    label: "string literal",
})

await expectFailure({
    expr: `throw "nope"`,
    pattern: /nope|throw|error/i,
    label: "throw raises",
})

console.log("shared_tooling self-test: ok")
