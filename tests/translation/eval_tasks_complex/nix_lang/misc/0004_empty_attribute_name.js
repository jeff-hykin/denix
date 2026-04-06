#!/usr/bin/env -S deno run --allow-all
// Auto-generated from misc.sh:37
// Attribute path error: empty attribute name

import { expectFailure } from "../../shared_tooling/index.js"

await expectFailure({
    expr: '{}',
    pattern: "empty attribute name",
    json: false,
    extraFlags: ['-A', '.'],
    label: 'empty attribute name',
})
