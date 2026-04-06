#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:29
// `system` affects if `eval-system` is an empty string (bar)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.currentSystem',
    expected: 'bar',
    extraFlags: ['--system', 'bar', '--eval-system', ''],
    label: 'builtins.currentSystem with --system bar --eval-system empty',
})
