#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:62
// fetchGit revCount should equal the number of commits

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir }) => {
    const res = await runDenix(["--eval", "--impure", "--expr",
        `(builtins.fetchGit "file://${repoDir}").revCount`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== "2" || res.code !== 0) {
        console.error("FAIL: revCount", { actual, expected: "2", stderr: res.stderr, code: res.code })
        Deno.exit(1)
    }
})
