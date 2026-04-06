#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:25
// `system` alone affects builtins.currentSystem (bar)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.currentSystem',
    expected: 'bar',
    extraFlags: ['--system', 'bar'],
    label: 'builtins.currentSystem with --system bar',
})
