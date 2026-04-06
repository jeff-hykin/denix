#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitSubmodules.sh:103-121
// Test .gitmodules with entries that refer to non-existent objects or non-submodules

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

    // Add bad submodule entries to .gitmodules
    const gitmodules = await Deno.readTextFile(`${rootRepo}/.gitmodules`)
    await Deno.writeTextFile(`${rootRepo}/.gitmodules`, gitmodules + `
[submodule "missing"]
        path = missing
        url = https://example.org/missing.git

[submodule "file"]
        path = file
        url = https://example.org/file.git
`)
    await Deno.writeTextFile(`${rootRepo}/file`, "foo\n")
    await git(rootRepo, "add", "file")
    await git(rootRepo, "commit", "-a", "-m", "Add bad submodules")

    const rev = await git(rootRepo, "rev-parse", "HEAD")
    const url = `file://${rootRepo}`

    const r = await evalRaw(`builtins.fetchGit { url = "${url}"; rev = "${rev}"; submodules = true; }`)

    // Check that file exists and missing does not
    try {
        const stat = await Deno.stat(`${r}/file`)
        if (!stat.isFile) { console.error("FAIL: /file is not a file"); Deno.exit(1) }
    } catch {
        console.error("FAIL: /file does not exist"); Deno.exit(1)
    }

    try {
        await Deno.stat(`${r}/missing`)
        console.error("FAIL: /missing should not exist"); Deno.exit(1)
    } catch {
        // expected
    }

    console.log("PASS: bad submodule entries handled correctly")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
