#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:19
// Store dir follows `store` store setting (/bar)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.storeDir',
    expected: '/bar',
    extraFlags: ['--store', 'dummy://?store=/bar'],
    label: 'builtins.storeDir with store=/bar',
})
