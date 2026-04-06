#!/usr/bin/env -S deno run --allow-all
// Test: Building the same derivation twice should be a cache hit.
// The second build should not re-execute the builder.

import { withSession, assertCacheHit } from "../shared_tooling/index.js"

await withSession(async (sess) => {
    const drv = await sess.eval(`
        derivation {
            name = "cache-test";
            system = "x86_64-linux";
            builder = "/bin/sh";
            args = [ "-c" "echo cached > $out/status" ];
        }
    `)

    await assertCacheHit(sess, drv, {
        label: "second build should be cache hit",
    })
})
