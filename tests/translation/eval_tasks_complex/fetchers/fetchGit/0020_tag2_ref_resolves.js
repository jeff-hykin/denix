#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:243-246
// Specifying ref = "refs/tags/tag2" should resolve to the correct commit

import { withGitRepo, runDenix } from "../../shared_tooling/index.js"

const decoder = new TextDecoder()

async function git(cwd, ...args) {
    const proc = new Deno.Command("git", {
        args,
        cwd,
        env: {
            GIT_AUTHOR_NAME: "Test",
            GIT_AUTHOR_EMAIL: "test@localhost",
            GIT_COMMITTER_NAME: "Test",
            GIT_COMMITTER_EMAIL: "test@localhost",
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
    commits: [
        { files: { "hello": "utrecht\n", ".gitignore": "" }, message: "Bla1", tag: "tag1" },
        { files: { "hello": "world\n" }, message: "Bla2", tag: "tag2" },
    ]
}, async ({ repoDir }) => {
    const expectedRev = await git(repoDir, "rev-parse", "refs/tags/tag2^{commit}")

    const res = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit { url = "file://${repoDir}"; ref = "refs/tags/tag2"; }).rev`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== expectedRev || res.code !== 0) {
        console.error("FAIL: tag2 ref resolves", { actual, expected: expectedRev, stderr: res.stderr })
        Deno.exit(1)
    }
})
