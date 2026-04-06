#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tarball.sh:52
// fetchTree with type=tarball should reject the 'name' attribute
// as it would mess with content-addressing

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix([
    "--eval", "--expr",
    `fetchTree { type = "tarball"; url = "file:///no-such-tarball.tar.gz"; narHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="; name = "foo"; }`,
])

if (res.code === 0) {
    console.error("expected failure when fetchTree tarball includes name attribute, but got success")
    console.error("stdout:", res.stdout)
    Deno.exit(1)
}
