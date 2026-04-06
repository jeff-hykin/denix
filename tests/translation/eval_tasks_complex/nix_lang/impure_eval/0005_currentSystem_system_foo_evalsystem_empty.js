#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:28
// `system` affects if `eval-system` is an empty string (foo)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.currentSystem',
    expected: 'foo',
    extraFlags: ['--system', 'foo', '--eval-system', ''],
    label: 'builtins.currentSystem with --system foo --eval-system empty',
})
