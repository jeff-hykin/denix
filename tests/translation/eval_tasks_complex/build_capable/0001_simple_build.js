#!/usr/bin/env -S deno run --allow-all
// Test: Build a simple derivation that writes a file to $out.
// Ported from simple.sh — the most basic build test.

import { withSession, assertBuilt } from "../shared_tooling/index.js"

await withSession(async (sess) => {
    const drv = await sess.eval(`
        derivation {
            name = "simple-test";
            system = "x86_64-linux";
            builder = "/bin/sh";
            args = [ "-c" "echo hello > $out/greeting" ];
        }
    `)

    await assertBuilt(sess, drv, {
        file: "greeting",
        content: "hello",
        label: "simple build writes greeting file",
    })
})
