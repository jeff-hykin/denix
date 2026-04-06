#!/usr/bin/env -S deno run --allow-all
// Test: A derivation whose builder exits non-zero should fail.

import { withSession, assertBuildFails } from "../shared_tooling/index.js"

await withSession(async (sess) => {
    const drv = await sess.eval(`
        derivation {
            name = "fail-test";
            system = "x86_64-linux";
            builder = "/bin/sh";
            args = [ "-c" "echo 'this fails'; exit 1" ];
        }
    `)

    await assertBuildFails(sess, drv, {
        pattern: /exit code 1/,
        label: "builder exits 1 → build fails",
    })
})
