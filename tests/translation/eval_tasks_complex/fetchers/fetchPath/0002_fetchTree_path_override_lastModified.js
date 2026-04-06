#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchPath.sh:11
// fetchTree path with overridden lastModified = 123

import { withTempTree, bashAssert } from "../../shared_tooling/index.js"

await withTempTree({
    files: { "foo": "" },
}, async ({ root }) => {
    await bashAssert({
        args: [
            "--eval", "--impure", "--expr",
            `(builtins.fetchTree { type = "path"; path = "${root}/foo"; lastModified = 123; }).lastModified`,
        ],
        expected: "123",
        label: "fetchTree path override lastModified = 123",
    })
})
