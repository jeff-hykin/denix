#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitSubmodules.sh:45-49
// Tests that fetchGit without submodules flag equals fetchGit with submodules=false

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

const tmpDir = await Deno.makeTempDir()
try {
    const subRepo = `${tmpDir}/sub`
    const rootRepo = `${tmpDir}/root`

    // Create sub repo
    await Deno.mkdir(subRepo, { recursive: true })
    await git(subRepo, "init")
    await git(subRepo, "checkout", "-b", "master")
    await Deno.writeTextFile(`${subRepo}/content`, "lorem ipsum\n")
    await git(subRepo, "add", "content")
    await git(subRepo, "commit", "-m", "Initial commit")

    // Create root repo with submodule
    await Deno.mkdir(rootRepo, { recursive: true })
    await git(rootRepo, "init")
    await git(rootRepo, "checkout", "-b", "master")
    await git(rootRepo, "submodule", "init")
    await git(rootRepo, "submodule", "add", subRepo, "sub")
    await git(rootRepo, "add", "sub")
    await git(rootRepo, "commit", "-m", "Add submodule")

    const rev = await git(rootRepo, "rev-parse", "HEAD")

    const r1 = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit { url = "file://${rootRepo}"; rev = "${rev}"; }).outPath`])
    const r2 = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `(builtins.fetchGit { url = "file://${rootRepo}"; rev = "${rev}"; submodules = false; }).outPath`])

    const v1 = (r1.stdout || "").replace(/\n+$/, "")
    const v2 = (r2.stdout || "").replace(/\n+$/, "")

    if (r1.code !== 0) { console.error("FAIL: r1 non-zero exit:", r1.stderr); Deno.exit(1) }
    if (r2.code !== 0) { console.error("FAIL: r2 non-zero exit:", r2.stderr); Deno.exit(1) }
    if (v1 !== v2) { console.error(`FAIL: default (${v1}) != submodules=false (${v2})`); Deno.exit(1) }

    console.log("PASS: fetchGit default == submodules=false")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
