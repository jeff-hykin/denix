#!/usr/bin/env -S deno run --allow-all
// Auto-generated from misc.sh:25-27
// Eval error: infinite recursion encountered

import { expectFailure } from "../../shared_tooling/index.js"

await expectFailure({
    expr: 'let a = {} // a; in a.foo',
    pattern: "infinite recursion encountered",
    json: false,
    label: 'infinite recursion encountered',
})
