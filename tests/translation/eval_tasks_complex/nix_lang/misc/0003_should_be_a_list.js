#!/usr/bin/env -S deno run --allow-all
// Auto-generated from misc.sh:36
// Attribute path error: should be a list

import { expectFailure } from "../../shared_tooling/index.js"

await expectFailure({
    expr: '{}',
    pattern: "should be a list",
    json: false,
    extraFlags: ['-A', '1'],
    label: 'should be a list',
})
