#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:293-296
// An empty repo with an untracked file should still return empty attrs

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: []
}, async ({ repoDir }) => {
    // Add an untracked file (not staged)
    await Deno.writeTextFile(`${repoDir}/x`, "foo\n")

    const expected = '{ lastModified = 0; lastModifiedDate = "19700101000000"; narHash = "sha256-pQpattmS9VmO3ZIQUFn66az8GSmB4IvYhTTCFn6SUmo="; rev = "0000000000000000000000000000000000000000"; revCount = 0; shortRev = "0000000"; submodules = false; }'

    const res = await runDenix(["--eval", "--impure", "--expr",
        `builtins.removeAttrs (builtins.fetchGit ${repoDir}) ["outPath"]`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== expected || res.code !== 0) {
        console.error("FAIL: empty repo untracked file attrs", { actual, expected, stderr: res.stderr })
        Deno.exit(1)
    }
})
