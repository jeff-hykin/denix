#!/usr/bin/env -S deno run --allow-all
// Test: Build a derivation with multiple outputs.
// Ported from multiple-outputs.sh pattern.

import { withSession, assertBuilt } from "../shared_tooling/index.js"

await withSession(async (sess) => {
    const drv = await sess.eval(`
        derivation {
            name = "multi-out";
            system = "x86_64-linux";
            builder = "/bin/sh";
            outputs = [ "out" "dev" "doc" ];
            args = [ "-c" ''
                echo "lib files" > $out/lib.txt
                echo "headers" > $dev/include.txt
                echo "manpages" > $doc/man.txt
            '' ];
        }
    `)

    await assertBuilt(sess, drv, {
        outputs: ["out", "dev", "doc"],
        file: "lib.txt",
        content: "lib files",
        label: "multi-output build — out",
    })
})
