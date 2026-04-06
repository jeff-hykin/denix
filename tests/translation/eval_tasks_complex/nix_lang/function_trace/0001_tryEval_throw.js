#!/usr/bin/env -S deno run --allow-all
// Auto-generated from function-trace.sh:34
// failure inside a tryEval

import { expectTrace } from "../../shared_tooling/index.js"

await expectTrace({
    expr: 'builtins.tryEval (throw "example")',
    expected: `
function-trace entered \u00abstring\u00bb:1:1 at
function-trace entered \u00abstring\u00bb:1:19 at
function-trace exited \u00abstring\u00bb:1:19 at
function-trace exited \u00abstring\u00bb:1:1 at
`,
    label: "failure inside a tryEval",
})
