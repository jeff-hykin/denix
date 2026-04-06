#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:304-311
// A repo with an empty commit should have lastModified != 0, rev != all-zeros, revCount == 1

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

const decoder = new TextDecoder()

async function git(cwd, ...args) {
    const proc = new Deno.Command("git", {
        args,
        cwd,
        env: {
            GIT_AUTHOR_NAME: "Foobar",
            GIT_AUTHOR_EMAIL: "foobar@example.com",
            GIT_COMMITTER_NAME: "Foobar",
            GIT_COMMITTER_EMAIL: "foobar@example.com",
            PATH: Deno.env.get("PATH") || "/usr/bin:/bin",
        },
        stdout: "piped",
        stderr: "piped",
    })
    const out = await proc.output()
    if (out.code !== 0) throw new Error(`git ${args.join(" ")} failed: ${decoder.decode(out.stderr)}`)
    return decoder.decode(out.stdout).trim()
}

await withGitRepo({
    commits: []
}, async ({ repoDir }) => {
    // Make an empty commit
    await git(repoDir, "commit", "--allow-empty", "--allow-empty-message", "--message", "")

    const res = await runDenix(["--eval", "--impure", "--expr",
        `let attrs = builtins.fetchGit ${repoDir}; in assert attrs.lastModified != 0; assert attrs.rev != "0000000000000000000000000000000000000000"; assert attrs.revCount == 1; true`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== "true" || res.code !== 0) {
        console.error("FAIL: empty commit attrs", { actual, expected: "true", stderr: res.stderr })
        Deno.exit(1)
    }
})
