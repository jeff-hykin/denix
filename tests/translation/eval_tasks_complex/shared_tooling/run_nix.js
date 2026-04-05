// run_nix.js — spawn real `nix-instantiate` and capture its output.
//
// Shape:
//     const { stdout, stderr, code } = await runNix(["--eval", "--strict", "-E", expr], { cwd })
//
// If `nix-instantiate` is not available on PATH the returned result has
// `code: null` and `missing: true`, letting callers decide whether to
// skip or mark as inconclusive.

const decoder = new TextDecoder()

let NIX_INSTANTIATE_PATH = null
let probed = false

async function probeNixInstantiate() {
    if (probed) return NIX_INSTANTIATE_PATH
    probed = true
    try {
        const proc = new Deno.Command("nix-instantiate", {
            args: ["--version"],
            stdout: "null",
            stderr: "null",
        })
        const { code } = await proc.output()
        if (code === 0) NIX_INSTANTIATE_PATH = "nix-instantiate"
    } catch {
        NIX_INSTANTIATE_PATH = null
    }
    return NIX_INSTANTIATE_PATH
}

export async function nixAvailable() {
    return (await probeNixInstantiate()) != null
}

export async function runNix(args, opts = {}) {
    const bin = await probeNixInstantiate()
    if (bin == null) {
        return { stdout: "", stderr: "nix-instantiate not found on PATH", code: null, missing: true }
    }
    const env = { ...(opts.env || {}) }
    for (const k of ["PATH", "HOME", "TMPDIR", "NIX_PATH"]) {
        if (env[k] == null) {
            const v = Deno.env.get(k); if (v != null) env[k] = v
        }
    }
    const proc = new Deno.Command(bin, {
        args,
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
        missing: false,
    }
}
