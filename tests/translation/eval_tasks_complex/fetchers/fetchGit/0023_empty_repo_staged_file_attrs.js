#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGit.sh:298-302
// An empty repo with a staged file should return updated narHash

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
    commits: []
}, async ({ repoDir }) => {
    await Deno.writeTextFile(`${repoDir}/x`, "foo\n")
    await git(repoDir, "add", "x")

    const expected = '{ lastModified = 0; lastModifiedDate = "19700101000000"; narHash = "sha256-wzlAGjxKxpaWdqVhlq55q5Gxo4Bf860+kLeEa/v02As="; rev = "0000000000000000000000000000000000000000"; revCount = 0; shortRev = "0000000"; submodules = false; }'

    const res = await runDenix(["--eval", "--impure", "--expr",
        `builtins.removeAttrs (builtins.fetchGit ${repoDir}) ["outPath"]`])
    const actual = (res.stdout || "").replace(/\n+$/, "")
    if (actual !== expected || res.code !== 0) {
        console.error("FAIL: empty repo staged file attrs", { actual, expected, stderr: res.stderr })
        Deno.exit(1)
    }
})
