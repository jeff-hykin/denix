#!/usr/bin/env -S deno run --allow-all
// Auto-generated from function-trace.sh:48
// Too many arguments to a formal function

import { expectTrace } from "../../shared_tooling/index.js"

await expectTrace({
    expr: '({ x }: x) { x = "x"; y = "y"; }',
    expected: `
function-trace entered \u00abstring\u00bb:1:1 at
function-trace exited \u00abstring\u00bb:1:1 at
`,
    label: "too many arguments to a formal function",
})
