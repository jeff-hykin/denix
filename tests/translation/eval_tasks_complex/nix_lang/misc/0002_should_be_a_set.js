#!/usr/bin/env -S deno run --allow-all
// Auto-generated from misc.sh:35
// Attribute path error: should be a set

import { expectFailure } from "../../shared_tooling/index.js"

await expectFailure({
    expr: '[]',
    pattern: "should be a set",
    json: false,
    extraFlags: ['-A', 'x'],
    label: 'should be a set',
})
