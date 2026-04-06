#!/usr/bin/env -S deno run --allow-all
// Auto-generated from impure-eval.sh:18
// Store dir follows `store` store setting (/foo)

import { simpleTest } from "../../shared_tooling/index.js"

await simpleTest({
    expr: 'builtins.storeDir',
    expected: '/foo',
    extraFlags: ['--store', 'dummy://?store=/foo'],
    label: 'builtins.storeDir with store=/foo',
})
