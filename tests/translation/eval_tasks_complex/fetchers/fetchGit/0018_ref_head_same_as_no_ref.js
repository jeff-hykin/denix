#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:220-222
// Explicit ref = "HEAD" should produce same outPath as without ref

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir }) => {
    const res1 = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit { url = "file://${repoDir}"; ref = "HEAD"; }).outPath`])
    const res2 = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit { url = "file://${repoDir}"; }).outPath`])
    const path1 = (res1.stdout || "").replace(/\n+$/, "")
    const path2 = (res2.stdout || "").replace(/\n+$/, "")
    if (path1 !== path2 || res1.code !== 0 || res2.code !== 0) {
        console.error("FAIL: ref HEAD same as no ref", { path1, path2, stderr1: res1.stderr, stderr2: res2.stderr })
        Deno.exit(1)
    }
})
