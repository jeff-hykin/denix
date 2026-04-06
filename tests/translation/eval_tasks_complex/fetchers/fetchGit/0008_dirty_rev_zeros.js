#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:125
// Dirty working tree should report rev as all zeros

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
    // Make the tree dirty: add a tracked file, remove hello
    await Deno.mkdir(`${repoDir}/dir1`, { recursive: true })
    await Deno.writeTextFile(`${repoDir}/dir1/foo`, "foo")
    await Deno.writeTextFile(`${repoDir}/bar`, "bar")
    await git(repoDir, "add", "dir1/foo")
    await git(repoDir, "rm", "hello")

    const res = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit ${repoDir}).rev`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    const expected = "0000000000000000000000000000000000000000"
    if (actual !== expected || res.code !== 0) {
        console.error("FAIL: dirty rev zeros", { actual, expected, stderr: res.stderr })
        Deno.exit(1)
    }
})
