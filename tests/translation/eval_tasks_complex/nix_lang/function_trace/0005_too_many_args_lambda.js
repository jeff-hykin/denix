#!/usr/bin/env -S deno run --allow-all
// Auto-generated from function-trace.sh:60
// Too many arguments to a lambda

import { expectTrace } from "../../shared_tooling/index.js"

await expectTrace({
    expr: '(x: x) 1 2',
    expected: `
function-trace entered \u00abstring\u00bb:1:1 at
function-trace exited \u00abstring\u00bb:1:1 at
`,
    label: "too many arguments to a lambda",
})
