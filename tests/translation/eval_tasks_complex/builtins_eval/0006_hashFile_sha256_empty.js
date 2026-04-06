#!/usr/bin/env -S deno run --allow-all
// builtins.hashFile "sha256" /path/to/empty/file

import { withTempTree, runDenix } from "../shared_tooling/index.js"

await withTempTree({ files: { "empty.txt": "" } }, async ({ root }) => {
    const res = await runDenix(["--eval", "--expr", `builtins.hashFile "sha256" ${root}/empty.txt`])
    const actual = res.stdout.replace(/\n+$/, "")
    const expected = `"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"`
    if (actual !== expected || res.code !== 0) {
        console.error(`FAIL: hashFile sha256 empty file`)
        console.error(`  expected: ${expected}`)
        console.error(`  actual:   ${actual}`)
        console.error(`  stderr:   ${res.stderr}`)
        Deno.exit(1)
    }
})
