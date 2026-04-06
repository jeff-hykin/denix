// fetchers.js — fixture helpers for fetcher tests (fetchGit, fetchurl, tarball).
//
// Each helper follows the withX(opts, fn) pattern: set up a resource,
// pass it to fn, and tear it down in a finally block (even on throw).

const decoder = new TextDecoder()

let counter = 0
function nextId() {
    counter += 1
    return `${Date.now()}_${Deno.pid}_${counter}`
}

const gitEnv = {
    GIT_AUTHOR_NAME: "Test",
    GIT_AUTHOR_EMAIL: "test@localhost",
    GIT_COMMITTER_NAME: "Test",
    GIT_COMMITTER_EMAIL: "test@localhost",
}

async function git(cwd, ...args) {
    const proc = new Deno.Command("git", {
        args,
        cwd,
        env: { ...gitEnv, PATH: Deno.env.get("PATH") || "/usr/bin:/bin" },
        stdout: "piped",
        stderr: "piped",
    })
    const { stdout, stderr, code } = await proc.output()
    if (code !== 0) {
        const err = decoder.decode(stderr)
        throw new Error(`git ${args.join(" ")} failed (code ${code}): ${err}`)
    }
    return decoder.decode(stdout).trim()
}

/**
 * Creates a temporary git repo, makes commits, and passes repo info to `fn`.
 *
 * @param opts.commits — array of { files: { "path": "content" }, message: "msg", tag?: "v1" }
 */
export async function withGitRepo({ commits = [] }, fn) {
    const root = await Deno.makeTempDir({ prefix: `denix_git_${nextId()}_` })
    try {
        await git(root, "init")
        await git(root, "checkout", "-b", "main")

        const revs = []
        const tags = []

        for (const commit of commits) {
            for (const [path, content] of Object.entries(commit.files || {})) {
                const full = `${root}/${path}`
                const dir = full.replace(/\/[^/]+$/, "")
                if (dir !== full) await Deno.mkdir(dir, { recursive: true })
                await Deno.writeTextFile(full, content)
            }
            await git(root, "add", ".")
            await git(root, "commit", "-m", commit.message || "commit")
            const rev = await git(root, "rev-parse", "HEAD")
            revs.push(rev)

            if (commit.tag) {
                await git(root, "tag", "-a", commit.tag, "-m", commit.tag)
                tags.push(commit.tag)
            }
        }

        return await fn({
            repoDir: root,
            repoUrl: `file://${root}`,
            revs,
            tags,
        })
    } finally {
        try { await Deno.remove(root, { recursive: true }) } catch { /* ignore */ }
    }
}

/**
 * Serves files over localhost HTTP on an auto-assigned port.
 *
 * @param opts.files — { "/path": "content" | Uint8Array }
 */
export async function withHttpServer({ files = {} }, fn) {
    const { promise: ready, resolve: onReady } = Promise.withResolvers()

    const server = Deno.serve({ port: 0, onListen: (addr) => onReady(addr) }, (req) => {
        const url = new URL(req.url)
        const entry = files[url.pathname]
        if (entry == null) return new Response("not found", { status: 404 })
        const body = typeof entry === "string" ? new TextEncoder().encode(entry) : entry
        return new Response(body)
    })

    const addr = await ready
    try {
        return await fn({
            baseUrl: `http://localhost:${addr.port}`,
            close: () => server.shutdown(),
        })
    } finally {
        try { await server.shutdown() } catch { /* ignore */ }
    }
}

/**
 * Creates a .tar.gz file from a set of files.
 *
 * @param opts.files — { "relative/path": "content" }
 */
export async function withTarball({ files = {} }, fn) {
    const root = await Deno.makeTempDir({ prefix: `denix_tar_${nextId()}_` })
    try {
        for (const [path, content] of Object.entries(files)) {
            const full = `${root}/${path}`
            const dir = full.replace(/\/[^/]+$/, "")
            if (dir !== full) await Deno.mkdir(dir, { recursive: true })
            await Deno.writeTextFile(full, content)
        }

        const tarballPath = `${root}.tar.gz`
        const proc = new Deno.Command("tar", {
            args: ["czf", tarballPath, "-C", root, "."],
            stdout: "piped",
            stderr: "piped",
        })
        const { code, stderr } = await proc.output()
        if (code !== 0) {
            throw new Error(`tar failed (code ${code}): ${decoder.decode(stderr)}`)
        }

        return await fn({ tarballPath, dir: root })
    } finally {
        try { await Deno.remove(root, { recursive: true }) } catch { /* ignore */ }
        try { await Deno.remove(`${root}.tar.gz`) } catch { /* ignore */ }
    }
}
