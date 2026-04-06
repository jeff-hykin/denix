#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitSubmodules.sh:52-62
// Tests fetchGit submodule behavior with ref="master" combinations

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

async function evalFetchGit(expr) {
    const res = await runDenix(["--eval", "--impure", "--raw", "--expr", expr])
    if (res.code !== 0) throw new Error(`eval failed: ${res.stderr}`)
    return (res.stdout || "").replace(/\n+$/, "")
}

const tmpDir = await Deno.makeTempDir()
try {
    const subRepo = `${tmpDir}/sub`
    const rootRepo = `${tmpDir}/root`

    await Deno.mkdir(subRepo, { recursive: true })
    await git(subRepo, "init")
    await git(subRepo, "checkout", "-b", "master")
    await Deno.writeTextFile(`${subRepo}/content`, "lorem ipsum\n")
    await git(subRepo, "add", "content")
    await git(subRepo, "commit", "-m", "Initial commit")

    await Deno.mkdir(rootRepo, { recursive: true })
    await git(rootRepo, "init")
    await git(rootRepo, "checkout", "-b", "master")
    await git(rootRepo, "submodule", "init")
    await git(rootRepo, "submodule", "add", subRepo, "sub")
    await git(rootRepo, "add", "sub")
    await git(rootRepo, "commit", "-m", "Add submodule")

    const rev = await git(rootRepo, "rev-parse", "HEAD")
    const url = `file://${rootRepo}`

    // r1: no ref, no submodules flag
    const r1 = await evalFetchGit(`(builtins.fetchGit { url = "${url}"; rev = "${rev}"; }).outPath`)
    // r4: with ref="master", no submodules
    const r4 = await evalFetchGit(`(builtins.fetchGit { url = "${url}"; ref = "master"; rev = "${rev}"; }).outPath`)
    // r5: ref="master", submodules=false
    const r5 = await evalFetchGit(`(builtins.fetchGit { url = "${url}"; ref = "master"; rev = "${rev}"; submodules = false; }).outPath`)
    // r3: no ref, submodules=true
    const r3 = await evalFetchGit(`(builtins.fetchGit { url = "${url}"; rev = "${rev}"; submodules = true; }).outPath`)
    // r6: ref="master", submodules=true
    const r6 = await evalFetchGit(`(builtins.fetchGit { url = "${url}"; ref = "master"; rev = "${rev}"; submodules = true; }).outPath`)
    // r7: bare path url, ref="master", submodules=true
    const r7 = await evalFetchGit(`(builtins.fetchGit { url = ${rootRepo}; ref = "master"; rev = "${rev}"; submodules = true; }).outPath`)
    // r8: bare path url, no ref, submodules=true
    const r8 = await evalFetchGit(`(builtins.fetchGit { url = ${rootRepo}; rev = "${rev}"; submodules = true; }).outPath`)

    const checks = [
        [r1, r4, "r1 == r4"],
        [r4, r5, "r4 == r5"],
        [r3, r6, "r3 == r6"],
        [r6, r7, "r6 == r7"],
        [r7, r8, "r7 == r8"],
    ]
    for (const [a, b, label] of checks) {
        if (a !== b) { console.error(`FAIL: ${label}: ${a} != ${b}`); Deno.exit(1) }
    }

    console.log("PASS: fetchGit submodule ref combinations match")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
