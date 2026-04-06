#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitShallow.sh:41
// Shallow clone with shallow=true should not have revCount (returns fallback)

import { runDenix } from "../../shared_tooling/index.js"

const decoder = new TextDecoder()
const gitEnv = {
    GIT_AUTHOR_NAME: "Test",
    GIT_AUTHOR_EMAIL: "test@localhost",
    GIT_COMMITTER_NAME: "Test",
    GIT_COMMITTER_EMAIL: "test@localhost",
    PATH: Deno.env.get("PATH") || "/usr/bin:/bin",
}

async function git(cwd, ...args) {
    const proc = new Deno.Command("git", { args, cwd, env: gitEnv, stdout: "piped", stderr: "piped" })
    const { stdout, stderr, code } = await proc.output()
    if (code !== 0) throw new Error(`git ${args.join(" ")} failed: ${decoder.decode(stderr)}`)
    return decoder.decode(stdout).trim()
}

const tmpDir = await Deno.makeTempDir()
try {
    const parentRepo = `${tmpDir}/parent`
    const shallowClone = `${tmpDir}/shallow`

    await Deno.mkdir(parentRepo, { recursive: true })
    await git(parentRepo, "init")
    await git(parentRepo, "checkout", "-b", "master")
    await Deno.writeTextFile(`${parentRepo}/file.txt`, "")
    await git(parentRepo, "add", "file.txt")
    await git(parentRepo, "commit", "-m", "First commit")
    await Deno.writeTextFile(`${parentRepo}/file.txt`, "second")
    await git(parentRepo, "commit", "-a", "-m", "Second commit")
    await Deno.writeTextFile(`${parentRepo}/file.txt`, "third")
    await git(parentRepo, "commit", "-a", "-m", "Third commit")
    await git(parentRepo, "checkout", "-b", "dev")
    await Deno.writeTextFile(`${parentRepo}/branch-file.txt`, "branch content")
    await git(parentRepo, "add", "branch-file.txt")
    await git(parentRepo, "commit", "-m", "Branch commit")

    await git(tmpDir, "clone", "--depth", "1", `file://${parentRepo}`, shallowClone)

    // revCount should be missing; using `or 123` as fallback should yield 123
    const res = await runDenix(["--eval", "--impure", "--expr",
        `(builtins.fetchTree { type = "git"; url = "file://${shallowClone}"; ref = "dev"; shallow = true; }).revCount or 123`])
    const actual = (res.stdout || "").replace(/\n+$/, "")

    if (res.code !== 0) { console.error("FAIL: eval failed:", res.stderr); Deno.exit(1) }
    if (actual !== "123") {
        console.error(`FAIL: expected revCount fallback 123, got: ${actual}`)
        Deno.exit(1)
    }

    console.log("PASS: shallow fetch has no revCount (fallback works)")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
