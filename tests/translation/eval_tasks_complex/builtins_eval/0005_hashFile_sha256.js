#!/usr/bin/env -S deno run --allow-all
// builtins.hashFile "sha256" /path/to/file containing "hello\n"

import { withTempTree, runDenix } from "../shared_tooling/index.js"

await withTempTree({ files: { "test.txt": "hello\n" } }, async ({ root }) => {
    const res = await runDenix(["--eval", "--expr", `builtins.hashFile "sha256" ${root}/test.txt`])
    const actual = res.stdout.replace(/\n+$/, "")
    const expected = `"5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03"`
    if (actual !== expected || res.code !== 0) {
        console.error(`FAIL: hashFile sha256 hello\\n`)
        console.error(`  expected: ${expected}`)
        console.error(`  actual:   ${actual}`)
        console.error(`  stderr:   ${res.stderr}`)
        Deno.exit(1)
    }
})
