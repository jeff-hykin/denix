#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:37
// `eval-system` overrides `system` (baz overrides foo)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.currentSystem',
    expected: 'baz',
    extraFlags: ['--system', 'foo', '--eval-system', 'baz'],
    label: 'builtins.currentSystem: eval-system baz overrides system foo',
})
