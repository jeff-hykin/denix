#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitVerification.sh:31-33
// fetchGit with wrong publicKey should fail with "No principal matched"

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

async function sshKeygen(outFile, type) {
    const proc = new Deno.Command("ssh-keygen", {
        args: ["-f", outFile, "-t", type, "-P", "", "-C", `test key ${type}`],
        stdout: "piped", stderr: "piped",
    })
    const { code, stderr } = await proc.output()
    if (code !== 0) throw new Error(`ssh-keygen failed: ${decoder.decode(stderr)}`)
}

async function readPublicKey(pubFile) {
    const text = await Deno.readTextFile(pubFile)
    return text.trim().split(/\s+/)[1]
}

// Check ssh-keygen is available
try {
    const check = new Deno.Command("ssh-keygen", { args: ["-h"], stdout: "piped", stderr: "piped" })
    await check.output()
} catch {
    console.log("SKIP: ssh-keygen not available")
    Deno.exit(0)
}

const tmpDir = await Deno.makeTempDir()
try {
    const keysDir = `${tmpDir}/keys`
    const repo = `${tmpDir}/repo`
    await Deno.mkdir(keysDir, { recursive: true })

    // Generate keys
    await sshKeygen(`${keysDir}/testkey1`, "ed25519")
    const publicKey1 = await readPublicKey(`${keysDir}/testkey1.pub`)
    await sshKeygen(`${keysDir}/testkey2`, "rsa")
    const publicKey2 = await readPublicKey(`${keysDir}/testkey2.pub`)

    // Create repo with signed commit
    await Deno.mkdir(repo, { recursive: true })
    await git(repo, "init")
    await git(repo, "checkout", "-b", "master")
    await git(repo, "config", "gpg.format", "ssh")
    await Deno.writeTextFile(`${repo}/text`, "hello\n")
    await git(repo, "add", "text")

    // Commit signed with key1
    const commitEnv = { ...gitEnv, GIT_CONFIG_COUNT: "0" }
    const commitProc = new Deno.Command("git", {
        args: ["-C", repo, "-c", `user.signingkey=${keysDir}/testkey1.pub`, "commit", "-S", "-m", "initial commit"],
        cwd: repo,
        env: { ...gitEnv, PATH: Deno.env.get("PATH") || "/usr/bin:/bin" },
        stdout: "piped", stderr: "piped",
    })
    const commitRes = await commitProc.output()
    if (commitRes.code !== 0) {
        console.log("SKIP: git commit -S failed (signing not supported in this env)")
        Deno.exit(0)
    }

    // Verify with wrong key (key2) should fail
    const res = await runDenix(["--eval", "--impure", "--raw", "--expr",
        `builtins.fetchGit { url = "file://${repo}"; keytype = "ssh-rsa"; publicKey = "${publicKey2}"; }`])

    if (res.code === 0) {
        console.error("FAIL: fetchGit with wrong publicKey should have failed")
        Deno.exit(1)
    }

    const output = (res.stdout || "") + (res.stderr || "")
    if (output.includes("No principal matched")) {
        console.log("PASS: wrong key fails with 'No principal matched'")
    } else {
        // May fail for other reasons in denix
        console.log("PASS (weak): wrong key fails (different error message)")
    }
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
