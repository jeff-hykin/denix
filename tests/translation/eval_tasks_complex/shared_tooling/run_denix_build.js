// run_denix_build.js — spawn `run/denix_build` and capture its output.
//
// Returns { stdout, stderr, code, outputPaths }.
// stdout contains the output path(s), one per line.

const decoder = new TextDecoder()
const denixBuildPath = new URL("../../../../run/denix_build", import.meta.url).pathname

export async function runDenixBuild(args, opts = {}) {
    const env = { ...(opts.env || {}) }
    for (const k of ["PATH", "HOME", "TMPDIR", "NIX_PATH",
                     "DENO_DIR", "DENO_INSTALL_ROOT", "XDG_CACHE_HOME",
                     "DENIX_STORE_ROOT"]) {
        if (env[k] == null) {
            const v = Deno.env.get(k); if (v != null) env[k] = v
        }
    }
    if (!env["DENO_DIR"]) {
        const home = Deno.env.get("HOME")
        if (home) env["DENO_DIR"] = `${home}/.cache/deno`
    }

    // Filter out any undefined/null values from env (Deno requires all strings)
    for (const k of Object.keys(env)) {
        if (env[k] == null) delete env[k]
    }

    const cmdOpts = {
        args: ["run", "--allow-all", "--quiet", denixBuildPath, ...args],
        env,
        clearEnv: true,
        stdout: "piped",
        stderr: "piped",
    }
    if (opts.cwd) cmdOpts.cwd = opts.cwd
    const proc = new Deno.Command(Deno.execPath(), cmdOpts)
    const { stdout, stderr, code } = await proc.output()
    const stdoutStr = decoder.decode(stdout)
    const stderrStr = decoder.decode(stderr)

    // Parse output paths from stdout (one per line)
    const outputPaths = stdoutStr.trim().split("\n").filter(l => l.length > 0)

    return {
        stdout: stdoutStr,
        stderr: stderrStr,
        code,
        outputPaths,
    }
}

/**
 * Run real `nix-build` and capture output for comparison.
 */
export async function runNixBuild(args, opts = {}) {
    const env = { ...(opts.env || {}) }
    for (const k of ["PATH", "HOME", "TMPDIR", "NIX_PATH"]) {
        if (env[k] == null) {
            const v = Deno.env.get(k); if (v != null) env[k] = v
        }
    }

    let bin = "nix-build"
    try {
        const probe = new Deno.Command(bin, { args: ["--version"], stdout: "null", stderr: "null" })
        const { code } = await probe.output()
        if (code !== 0) bin = null
    } catch {
        bin = null
    }

    if (!bin) {
        return { stdout: "", stderr: "nix-build not found on PATH", code: null, missing: true, outputPaths: [] }
    }

    for (const k of Object.keys(env)) {
        if (env[k] == null) delete env[k]
    }
    const cmdOpts = {
        args,
        env,
        clearEnv: true,
        stdout: "piped",
        stderr: "piped",
    }
    if (opts.cwd) cmdOpts.cwd = opts.cwd
    const proc = new Deno.Command(bin, cmdOpts)
    const { stdout, stderr, code } = await proc.output()
    const stdoutStr = decoder.decode(stdout)
    const stderrStr = decoder.decode(stderr)
    const outputPaths = stdoutStr.trim().split("\n").filter(l => l.length > 0)

    return { stdout: stdoutStr, stderr: stderrStr, code, outputPaths, missing: false }
}

/**
 * Build with both nix-build and denix_build, then compare outputs.
 *
 * For each output path, reads the file tree and compares contents.
 * Returns { ok, nixResult, denixResult, diffs }.
 */
export async function compareBuild(args, opts = {}) {
    const nixRes = await runNixBuild(args, opts)
    const denixRes = await runDenixBuild(["--no-out-link", ...args], opts)

    if (nixRes.missing) {
        // Can't compare — just check denix succeeded
        return {
            ok: denixRes.code === 0,
            nixResult: nixRes,
            denixResult: denixRes,
            diffs: nixRes.missing ? ["nix-build not available for comparison"] : [],
        }
    }

    const diffs = []

    // Compare exit codes
    if (nixRes.code !== denixRes.code) {
        diffs.push(`exit code: nix=${nixRes.code} denix=${denixRes.code}`)
    }

    // If both succeeded, compare output contents
    if (nixRes.code === 0 && denixRes.code === 0) {
        const nixPaths = nixRes.outputPaths
        const denixPaths = denixRes.outputPaths

        if (nixPaths.length !== denixPaths.length) {
            diffs.push(`output count: nix=${nixPaths.length} denix=${denixPaths.length}`)
        }

        // Compare file trees of corresponding outputs
        for (let i = 0; i < Math.min(nixPaths.length, denixPaths.length); i++) {
            const treeDiffs = await compareTree(nixPaths[i], denixPaths[i])
            diffs.push(...treeDiffs)
        }
    }

    return {
        ok: diffs.length === 0,
        nixResult: nixRes,
        denixResult: denixRes,
        diffs,
    }
}

/**
 * Compare two directory trees, returning a list of diff descriptions.
 */
async function compareTree(nixPath, denixPath, rel = "") {
    const diffs = []

    let nixStat, denixStat
    try { nixStat = await Deno.stat(nixPath) } catch { nixStat = null }
    try { denixStat = await Deno.stat(denixPath) } catch { denixStat = null }

    if (!nixStat && !denixStat) return diffs
    if (!nixStat) { diffs.push(`${rel || "/"}: exists only in denix`); return diffs }
    if (!denixStat) { diffs.push(`${rel || "/"}: exists only in nix`); return diffs }

    if (nixStat.isFile && denixStat.isFile) {
        const nixContent = await Deno.readTextFile(nixPath)
        const denixContent = await Deno.readTextFile(denixPath)
        if (nixContent !== denixContent) {
            diffs.push(`${rel || "/"}: file content differs (nix=${nixContent.length}b denix=${denixContent.length}b)`)
        }
    } else if (nixStat.isDirectory && denixStat.isDirectory) {
        const nixEntries = new Set()
        const denixEntries = new Set()
        for await (const e of Deno.readDir(nixPath)) nixEntries.add(e.name)
        for await (const e of Deno.readDir(denixPath)) denixEntries.add(e.name)

        for (const name of nixEntries) {
            if (!denixEntries.has(name)) {
                diffs.push(`${rel}/${name}: exists only in nix`)
            } else {
                const sub = await compareTree(`${nixPath}/${name}`, `${denixPath}/${name}`, `${rel}/${name}`)
                diffs.push(...sub)
            }
        }
        for (const name of denixEntries) {
            if (!nixEntries.has(name)) {
                diffs.push(`${rel}/${name}: exists only in denix`)
            }
        }
    } else {
        diffs.push(`${rel || "/"}: type mismatch (nix=${nixStat.isFile ? "file" : "dir"} denix=${denixStat.isFile ? "file" : "dir"})`)
    }

    return diffs
}
