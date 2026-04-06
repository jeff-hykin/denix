#!/usr/bin/env -S deno run --allow-all
// builtins.readDir on a directory with files and subdirectories

import { withTempTree, runDenix } from "../shared_tooling/index.js"

await withTempTree({
    files: { "a.txt": "content", "subdir/b.txt": "nested" },
    dirs: ["emptydir"],
}, async ({ root }) => {
    const res = await runDenix(["--eval", "--json", "--expr", `builtins.readDir ${root}`])
    if (res.code !== 0) {
        console.error(`FAIL: readDir exited with code ${res.code}`)
        console.error(`  stderr: ${res.stderr}`)
        Deno.exit(1)
    }
    const result = JSON.parse(res.stdout)
    // Expect: a.txt -> "regular", emptydir -> "directory", subdir -> "directory"
    if (result["a.txt"] !== "regular") {
        console.error(`FAIL: expected a.txt to be "regular", got ${JSON.stringify(result["a.txt"])}`)
        Deno.exit(1)
    }
    if (result["subdir"] !== "directory") {
        console.error(`FAIL: expected subdir to be "directory", got ${JSON.stringify(result["subdir"])}`)
        Deno.exit(1)
    }
    if (result["emptydir"] !== "directory") {
        console.error(`FAIL: expected emptydir to be "directory", got ${JSON.stringify(result["emptydir"])}`)
        Deno.exit(1)
    }
})
