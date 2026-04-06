#!/usr/bin/env -S deno run --allow-all
// Auto-generated from toString-path.sh:10
// builtins.readDir (builtins.toString (builtins.fetchTree { type = "path"; path = ... })) = {"bar":"regular"}

import { withTempTree, bashAssert } from "../../shared_tooling/index.js"

await withTempTree({
    files: { "foo/bar": "bla" },
}, async ({ root }) => {
    await bashAssert({
        args: [
            "--eval", "--json", "--impure", "--expr",
            `builtins.readDir (builtins.toString (builtins.fetchTree { type = "path"; path = "${root}/foo"; }))`,
        ],
        expected: '{"bar":"regular"}',
        label: "readDir via fetchTree path toString",
    })
})
