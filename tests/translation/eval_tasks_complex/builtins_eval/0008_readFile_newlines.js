#!/usr/bin/env -S deno run --allow-all
// builtins.readFile on a file with newlines

import { withTempTree, runDenix } from "../shared_tooling/index.js"

await withTempTree({ files: { "multi.txt": "line1\nline2\n" } }, async ({ root }) => {
    const res = await runDenix(["--eval", "--expr", `builtins.readFile ${root}/multi.txt`])
    const actual = res.stdout.replace(/\n+$/, "")
    const expected = `"line1\\nline2\\n"`
    if (actual !== expected || res.code !== 0) {
        console.error(`FAIL: readFile with newlines`)
        console.error(`  expected: ${expected}`)
        console.error(`  actual:   ${actual}`)
        console.error(`  stderr:   ${res.stderr}`)
        Deno.exit(1)
    }
})
