#!/usr/bin/env -S deno run --allow-all
// Auto-generated from misc.sh:34
// Attribute path error: missing closing quote in selection path

import { expectFailure } from "../../shared_tooling/index.js"

await expectFailure({
    expr: '{}',
    pattern: "missing closing quote in selection path",
    json: false,
    extraFlags: ['-A', '"x'],
    label: 'missing closing quote in selection path',
})
