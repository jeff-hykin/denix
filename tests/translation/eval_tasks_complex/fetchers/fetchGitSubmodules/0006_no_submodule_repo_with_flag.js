#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitSubmodules.sh:96-101
// Git repos without submodules can be fetched with submodules=true

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

async function evalRaw(expr) {
    const res = await runDenix(["--eval", "--impure", "--raw", "--expr", expr])
    if (res.code !== 0) throw new Error(`eval failed: ${res.stderr}`)
    return (res.stdout || "").replace(/\n+$/, "")
}

const tmpDir = await Deno.makeTempDir()
try {
    const subRepo = `${tmpDir}/repo`

    await Deno.mkdir(subRepo, { recursive: true })
    await git(subRepo, "init")
    await git(subRepo, "checkout", "-b", "master")
    await Deno.writeTextFile(`${subRepo}/content`, "lorem ipsum\n")
    await git(subRepo, "add", "content")
    await git(subRepo, "commit", "-m", "Initial commit")

    const subRev = await git(subRepo, "rev-parse", "HEAD")
    const url = `file://${subRepo}`

    const baseline = await evalRaw(`(builtins.fetchGit { url = "${url}"; rev = "${subRev}"; }).outPath`)
    const withSub = await evalRaw(`(builtins.fetchGit { url = "${url}"; rev = "${subRev}"; submodules = true; }).outPath`)

    if (baseline !== withSub) {
        console.error(`FAIL: repo without submodules should return same path with submodules=true: ${baseline} != ${withSub}`)
        Deno.exit(1)
    }

    console.log("PASS: no-submodule repo fetched with submodules=true matches baseline")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
