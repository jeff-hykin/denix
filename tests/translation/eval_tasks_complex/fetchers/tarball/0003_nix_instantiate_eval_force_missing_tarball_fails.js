#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tarball.sh:46
// nix-instantiate --eval -E '<fnord/xyzzy> 1' with nonexistent tarball -I path
// should fail because the path is actually forced

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix([
    "--eval", "--expr", "<fnord/xyzzy> 1",
    "-I", "fnord=file:///no-such-tarball.tar",
])

if (res.code === 0) {
    console.error("expected failure when forcing missing tarball -I path, but got success")
    console.error("stdout:", res.stdout)
    Deno.exit(1)
}
