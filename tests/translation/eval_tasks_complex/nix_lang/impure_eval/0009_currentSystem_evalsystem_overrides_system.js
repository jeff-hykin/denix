#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:36
// `eval-system` overrides `system` (bar overrides foo)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.currentSystem',
    expected: 'bar',
    extraFlags: ['--system', 'foo', '--eval-system', 'bar'],
    label: 'builtins.currentSystem: eval-system bar overrides system foo',
})
