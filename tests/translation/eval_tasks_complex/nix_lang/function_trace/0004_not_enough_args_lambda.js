#!/usr/bin/env -S deno run --allow-all
// Auto-generated from function-trace.sh:54
// Not enough arguments to a lambda

import { expectTrace } from "../../shared_tooling/index.js"

await expectTrace({
    expr: '(x: y: x + y) 1',
    expected: `
function-trace entered \u00abstring\u00bb:1:1 at
function-trace exited \u00abstring\u00bb:1:1 at
`,
    label: "not enough arguments to a lambda",
})
