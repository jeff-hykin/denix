#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitSubmodules.sh:193-234
// Tests nested submodules (A -> B -> C) with submodules=true

import { runDenix } from "../../shared_tooling/index.js"

const decoder = new TextDecoder()
const gitEnv = {
    GIT_AUTHOR_NAME: "Test",
    GIT_AUTHOR_EMAIL: "test@localhost",
    GIT_COMMITTER_NAME: "Test",
    GIT_COMMITTER_EMAIL: "test@localhost",
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "protocol.file.allow",
    GIT_CONFIG_VALUE_0: "always",
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
    const repoC = `${tmpDir}/c`
    const repoB = `${tmpDir}/b`
    const repoA = `${tmpDir}/a`

    // Create repo C
    await Deno.mkdir(repoC, { recursive: true })
    await git(repoC, "init")
    await git(repoC, "checkout", "-b", "master")
    await Deno.writeTextFile(`${repoC}/inside-c`, "")
    await git(repoC, "add", "inside-c")
    await Deno.writeTextFile(`${repoC}/content`, "lorem ipsum\n")
    await git(repoC, "add", "content")
    await git(repoC, "commit", "-m", "Initial commit")

    // Create repo B with submodule C
    await Deno.mkdir(repoB, { recursive: true })
    await git(repoB, "init")
    await git(repoB, "checkout", "-b", "master")
    await git(repoB, "submodule", "add", repoC, "c")
    await git(repoB, "add", "c")
    await Deno.writeTextFile(`${repoB}/content`, "lorem ipsum\n")
    await git(repoB, "add", "content")
    await git(repoB, "commit", "-m", "Initial commit")

    // Create repo A with submodule B
    await Deno.mkdir(repoA, { recursive: true })
    await git(repoA, "init")
    await git(repoA, "checkout", "-b", "master")
    await git(repoA, "submodule", "add", repoB, "b")
    await git(repoA, "add", "b")
    await Deno.writeTextFile(`${repoA}/content`, "lorem ipsum\n")
    await git(repoA, "add", "content")
    await git(repoA, "commit", "-m", "Initial commit")

    const rev = await git(repoA, "rev-parse", "HEAD")
    const url = `file://${repoA}`

    const out = await evalRaw(`(builtins.fetchGit { url = "${url}"; rev = "${rev}"; submodules = true; }).outPath`)

    // Check nested files exist
    const checks = [
        `${out}/b/c/inside-c`,
        `${out}/content`,
        `${out}/b/content`,
        `${out}/b/c/content`,
    ]
    for (const path of checks) {
        try {
            await Deno.stat(path)
        } catch {
            console.error(`FAIL: ${path} does not exist`); Deno.exit(1)
        }
    }

    console.log("PASS: nested submodules fetched correctly")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
