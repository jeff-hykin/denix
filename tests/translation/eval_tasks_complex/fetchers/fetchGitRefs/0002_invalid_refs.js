#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitRefs.sh:76-114
// Tests that invalid git ref names are rejected by fetchGit

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
    const repo = `${tmpDir}/repo`

    await Deno.mkdir(repo, { recursive: true })
    await git(repo, "init")
    await git(repo, "checkout", "-b", "master")
    await Deno.writeTextFile(`${repo}/hello`, "utrecht")
    await git(repo, "add", "hello")
    await git(repo, "commit", "-m", "Bla1")

    const invalidRefs = [
        "refs///heads/foo",
        "heads/foo/",
        "///heads/foo",
        ".foo",
        "./foo",
        "./foo/bar",
        "foo/./bar",
        "foo/bar/.",
        "foo bar",
        "foo?bar",
        "foo^bar",
        "foo~bar",
        "foo:bar",
        "foo[bar",
        "foo/bar/.",
        ".refs/foo",
        "refs/heads/foo.",
        "heads/foo..bar",
        "heads/foo?bar",
        "heads/foo.lock",
        "heads///foo.lock",
        "foo.lock/bar",
        "foo.lock///bar",
        "heads/v@{ation",
        "heads/foo\\.ar",
        "heads/foo\\bar",
        "heads/foo\t",
        "heads/foo\x1F",
        "heads/foo\x7F",
        "@",
        "foo/*",
        "*/foo",
        "foo/*/bar",
        "*",
        "foo/*/*",
        "*/foo/*",
        "/foo",
        "",
    ]

    let failures = 0
    for (const ref of invalidRefs) {
        const res = await runDenix(["--eval", "--raw", "--impure", "--expr",
            `(builtins.fetchGit { url = ${repo}; ref = ''${ref}''; }).outPath`])

        if (res.code === 0) {
            console.error(`FAIL: invalid ref "${ref}" was accepted (should have been rejected)`)
            failures++
        }
    }

    if (failures > 0) { console.error(`FAIL: ${failures} invalid ref(s) were accepted`); Deno.exit(1) }
    console.log("PASS: all invalid refs rejected")
} finally {
    await Deno.remove(tmpDir, { recursive: true })
}
