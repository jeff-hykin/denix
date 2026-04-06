#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchPath.sh:8
// fetchTree path:// lastModifiedDate should start with 2022111

import { withTempTree, runDenix } from "../../shared_tooling/index.js"

await withTempTree({
    files: { "foo": "" },
}, async ({ root }) => {
    // Set the mtime to 2022-11-11 11:11 (matching touch -t 202211111111)
    const mtime = new Date("2022-11-11T11:11:00")
    await Deno.utime(`${root}/foo`, mtime, mtime)

    const res = await runDenix([
        "--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchTree "path://${root}/foo").lastModifiedDate`,
    ])
    if (res.code !== 0) {
        console.error("denix failed:", res.stderr)
        Deno.exit(1)
    }
    const out = res.stdout.trim()
    if (!/^2022111/.test(out)) {
        console.error(`expected lastModifiedDate to match /^2022111/, got: ${out}`)
        Deno.exit(1)
    }
})
