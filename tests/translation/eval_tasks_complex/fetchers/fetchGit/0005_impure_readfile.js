#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:92
// In impure mode, fetchGit + readFile should work

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir }) => {
    const res = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `builtins.readFile (fetchGit "file://${repoDir}" + "/hello")`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== "world" || res.code !== 0) {
        console.error("FAIL: impure readFile", { actual, expected: "world", stderr: res.stderr })
        Deno.exit(1)
    }
})
