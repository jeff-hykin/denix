#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitSubmodules.sh:73-85
// Tests that repeated fetchGit with submodules=true returns same path,
// and that submodules=true differs from default

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

    const pathWithout = await evalRaw(`(builtins.fetchGit { url = "${url}"; rev = "${rev}"; }).outPath`)
    const pathWith1 = await evalRaw(`(builtins.fetchGit { url = "${url}"; rev = "${rev}"; submodules = true; }).outPath`)
    const pathWith2 = await evalRaw(`(builtins.fetchGit { url = "${url}"; rev = "${rev}"; submodules = true; }).outPath`)
    const pathWithRef = await evalRaw(`(builtins.fetchGit { url = "${url}"; ref = "master"; rev = "${rev}"; submodules = true; }).outPath`)

    if (pathWithout === pathWith1) {
        console.error(`FAIL: without submodules should differ from with submodules`); Deno.exit(1)
    }
    if (pathWith1 !== pathWith2) {
        console.error(`FAIL: same submodules=true should return same path: ${pathWith1} != ${pathWith2}`); Deno.exit(1)
    }
    if (pathWith2 !== pathWithRef) {
        console.error(`FAIL: submodules=true with/without ref should match: ${pathWith2} != ${pathWithRef}`); Deno.exit(1)
    }

    console.log("PASS: submodules consistency checks")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
