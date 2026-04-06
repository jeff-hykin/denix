#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:93
// In pure eval mode, fetchGit without a revision should fail

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

await withGitRepo({
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir }) => {
    const res = await runDenix(["--eval", "--raw", "--expr",
        `builtins.readFile (fetchGit "file://${repoDir}" + "/hello")`])
    if (res.code === 0) {
        console.error("FAIL: pure fetchGit without rev should fail but succeeded", { stdout: res.stdout })
        Deno.exit(1)
    }
})
