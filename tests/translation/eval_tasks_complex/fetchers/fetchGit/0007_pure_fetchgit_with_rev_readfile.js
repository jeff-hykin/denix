#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:100
// In pure eval mode, fetchGit with a revision should succeed

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir, revs }) => {
    const res = await runDenix(["--eval", "--raw", "--expr",
        `builtins.readFile (fetchGit { url = "file://${repoDir}"; rev = "${revs[1]}"; } + "/hello")`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== "world" || res.code !== 0) {
        console.error("FAIL: pure fetchGit with rev readFile", { actual, expected: "world", stderr: res.stderr })
        Deno.exit(1)
    }
})
