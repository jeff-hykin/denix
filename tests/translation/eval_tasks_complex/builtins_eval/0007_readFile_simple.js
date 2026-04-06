#!/usr/bin/env -S deno run --allow-all
// builtins.readFile /path/to/file where file contains "hello world"

import { withTempTree, runDenix } from "../shared_tooling/index.js"

await withTempTree({ files: { "test.txt": "hello world" } }, async ({ root }) => {
    const res = await runDenix(["--eval", "--expr", `builtins.readFile ${root}/test.txt`])
    const actual = res.stdout.replace(/\n+$/, "")
    const expected = `"hello world"`
    if (actual !== expected || res.code !== 0) {
        console.error(`FAIL: readFile simple`)
        console.error(`  expected: ${expected}`)
        console.error(`  actual:   ${actual}`)
        console.error(`  stderr:   ${res.stderr}`)
        Deno.exit(1)
    }
})
