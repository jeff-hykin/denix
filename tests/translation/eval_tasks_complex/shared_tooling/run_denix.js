// run_denix.js — spawn `denix eval` and capture its output.
//
// Accepts the same kind of arg list you would pass to nix-instantiate
// (minus the binary name). Returns { stdout, stderr, code }.

const decoder = new TextDecoder()
const denixCliPath = new URL("../../../../main/cli/denix.js", import.meta.url).pathname

export async function runDenix(args, opts = {}) {
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

    const proc = new Deno.Command(Deno.execPath(), {
        args: ["run", "--allow-all", "--quiet", denixCliPath, "eval", ...args],
        cwd: opts.cwd,
        env,
        clearEnv: true,
        stdout: "piped",
        stderr: "piped",
    })
    const { stdout, stderr, code } = await proc.output()
    return {
        stdout: decoder.decode(stdout),
        stderr: decoder.decode(stderr),
        code,
    }
}
