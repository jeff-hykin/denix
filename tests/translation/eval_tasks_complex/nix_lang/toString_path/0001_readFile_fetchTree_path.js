#!/usr/bin/env -S deno run --allow-all
// Auto-generated from toString-path.sh:8
// builtins.readFile (builtins.toString (builtins.fetchTree { type = "path"; path = ... } + "/bar")) = bla

import { withTempTree, bashAssert } from "../../shared_tooling/index.js"

await withTempTree({
    files: { "foo/bar": "bla" },
}, async ({ root }) => {
    await bashAssert({
        args: [
            "--eval", "--raw", "--impure", "--expr",
            `builtins.readFile (builtins.toString (builtins.fetchTree { type = "path"; path = "${root}/foo"; } + "/bar"))`,
        ],
        expected: "bla",
        label: "readFile via fetchTree path toString",
    })
})
