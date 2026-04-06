#!/usr/bin/env -S deno run --allow-all
// builtins.pathExists /path/that/doesnt/exist == false

import { withTempTree, runDenix } from "../shared_tooling/index.js"

await withTempTree({ files: {} }, async ({ root }) => {
    const res = await runDenix(["--eval", "--expr", `builtins.pathExists ${root}/nonexistent.txt`])
    const actual = res.stdout.replace(/\n+$/, "")
    if (actual !== "false" || res.code !== 0) {
        console.error(`FAIL: pathExists on nonexistent file`)
        console.error(`  expected: false`)
        console.error(`  actual:   ${actual}`)
        console.error(`  stderr:   ${res.stderr}`)
        Deno.exit(1)
    }
})
