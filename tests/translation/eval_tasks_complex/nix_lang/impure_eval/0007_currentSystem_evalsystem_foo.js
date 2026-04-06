#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:32
// `eval-system` alone affects builtins.currentSystem (foo)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.currentSystem',
    expected: 'foo',
    extraFlags: ['--eval-system', 'foo'],
    label: 'builtins.currentSystem with --eval-system foo',
})
