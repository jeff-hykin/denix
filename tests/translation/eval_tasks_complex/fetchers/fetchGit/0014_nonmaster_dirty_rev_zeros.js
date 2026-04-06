#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:178
// On non-master branch with dirty tree, rev should be all zeros

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
}, async ({ repoDir, revs }) => {
    // Checkout rev2 on a dev branch, make dirty
    await git(repoDir, "checkout", revs[1], "-b", "dev")
    await Deno.writeTextFile(`${repoDir}/hello`, "dev")

    const res = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit ${repoDir}).rev`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    const expected = "0000000000000000000000000000000000000000"
    if (actual !== expected || res.code !== 0) {
        console.error("FAIL: nonmaster dirty rev zeros", { actual, expected, stderr: res.stderr })
        Deno.exit(1)
    }
})
