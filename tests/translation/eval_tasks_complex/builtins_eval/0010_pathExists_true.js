#!/usr/bin/env -S deno run --allow-all
// builtins.pathExists /path/that/exists == true

import { withTempTree, runDenix } from "../shared_tooling/index.js"

await withTempTree({ files: { "exists.txt": "hi" } }, async ({ root }) => {
    const res = await runDenix(["--eval", "--expr", `builtins.pathExists ${root}/exists.txt`])
    const actual = res.stdout.replace(/\n+$/, "")
    if (actual !== "true" || res.code !== 0) {
        console.error(`FAIL: pathExists on existing file`)
        console.error(`  expected: true`)
        console.error(`  actual:   ${actual}`)
        console.error(`  stderr:   ${res.stderr}`)
        Deno.exit(1)
    }
})
