#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:290-291
// A workdir with no commits should return specific empty attrs

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: []
}, async ({ repoDir }) => {
    const expected = '{ lastModified = 0; lastModifiedDate = "19700101000000"; narHash = "sha256-pQpattmS9VmO3ZIQUFn66az8GSmB4IvYhTTCFn6SUmo="; rev = "0000000000000000000000000000000000000000"; revCount = 0; shortRev = "0000000"; submodules = false; }'

    const res = await runDenix(["--eval", "--impure", "--expr",
        `builtins.removeAttrs (builtins.fetchGit ${repoDir}) ["outPath"]`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== expected || res.code !== 0) {
        console.error("FAIL: empty repo attrs", { actual, expected, stderr: res.stderr })
        Deno.exit(1)
    }
})
