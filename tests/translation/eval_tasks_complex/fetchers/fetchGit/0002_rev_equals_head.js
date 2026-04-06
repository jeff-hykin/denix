#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:63
// fetchGit .rev should equal the latest commit hash

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir, revs }) => {
    const res = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit "file://${repoDir}").rev`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== revs[1] || res.code !== 0) {
        console.error("FAIL: rev", { actual, expected: revs[1], stderr: res.stderr })
        Deno.exit(1)
    }
})
