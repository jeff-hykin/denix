#!/usr/bin/env -S deno run --allow-all
// Auto-generated from function-trace.sh:42
// Missing argument to a formal function

import { expectTrace } from "../../shared_tooling/index.js"

await expectTrace({
    expr: '({ x }: x) { }',
    expected: `
function-trace entered \u00abstring\u00bb:1:1 at
function-trace exited \u00abstring\u00bb:1:1 at
`,
    label: "missing argument to a formal function",
})
