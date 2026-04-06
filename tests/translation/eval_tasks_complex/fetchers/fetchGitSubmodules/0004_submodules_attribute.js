#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitSubmodules.sh:64-71
// Tests that the .submodules attribute reflects the flag passed

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

async function evalExpr(expr) {
    const res = await runDenix(["--eval", "--impure", "--expr", expr])
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

    // default: submodules attribute should be false
    const v1 = await evalExpr(`(builtins.fetchGit { url = ${rootRepo}; rev = "${rev}"; }).submodules`)
    if (v1 !== "false") { console.error(`FAIL: default .submodules = ${v1}, expected false`); Deno.exit(1) }

    // explicit false
    const v2 = await evalExpr(`(builtins.fetchGit { url = ${rootRepo}; rev = "${rev}"; submodules = false; }).submodules`)
    if (v2 !== "false") { console.error(`FAIL: explicit false .submodules = ${v2}, expected false`); Deno.exit(1) }

    // explicit true
    const v3 = await evalExpr(`(builtins.fetchGit { url = ${rootRepo}; rev = "${rev}"; submodules = true; }).submodules`)
    if (v3 !== "true") { console.error(`FAIL: explicit true .submodules = ${v3}, expected true`); Deno.exit(1) }

    console.log("PASS: .submodules attribute reflects input flag")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
