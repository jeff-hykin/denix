#!/usr/bin/env -S deno run --allow-all
// Auto-generated from misc.sh:38
// Attribute path error: list index out of range

import { expectFailure } from "../../shared_tooling/index.js"

await expectFailure({
    expr: '[]',
    pattern: "out of range",
    json: false,
    extraFlags: ['-A', '1'],
    label: 'list index out of range',
})
