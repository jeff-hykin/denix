#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:64
// fetchGit .shortRev should be the first 7 chars of the full rev

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir, revs }) => {
    const res = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit "file://${repoDir}").shortRev`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    const expected = revs[1].substring(0, 7)
    if (actual !== expected || res.code !== 0) {
        console.error("FAIL: shortRev", { actual, expected, stderr: res.stderr })
        Deno.exit(1)
    }
})
