#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:89
// fetchGit with allRefs can read a file from a different branch

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
    // Create a devtest branch with a new file
    await git(repoDir, "checkout", "-b", "devtest")
    await Deno.writeTextFile(`${repoDir}/differentbranch`, "different file")
    await git(repoDir, "add", "differentbranch")
    await git(repoDir, "commit", "-m", "Test2")
    await git(repoDir, "checkout", "main")
    const devrev = await git(repoDir, "rev-parse", "devtest")

    const res = await runDenix(["--eval", "--raw", "--expr",
        `builtins.readFile (builtins.fetchGit { url = "file://${repoDir}"; rev = "${devrev}"; allRefs = true; } + "/differentbranch")`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== "different file" || res.code !== 0) {
        console.error("FAIL: readFile allRefs other branch", { actual, expected: "different file", stderr: res.stderr })
        Deno.exit(1)
    }
})
