// temp_store.js — withTempStore helper. Creates a fresh
// ./temp_nix/<uid>/store under the repo for the duration of fn and
// recursively removes it on exit (even on throw).

const repoRoot = new URL("../../../../", import.meta.url).pathname.replace(/\/$/, "")

let counter = 0
function nextId() {
    counter += 1
    return `${Date.now()}_${Deno.pid}_${counter}`
}

export async function withTempStore(fn) {
    const uid = nextId()
    const storeRoot = `${repoRoot}/temp_nix/${uid}/store`
    await Deno.mkdir(storeRoot, { recursive: true })
    try {
        return await fn({ storeRoot })
    } finally {
        try { await Deno.remove(`${repoRoot}/temp_nix/${uid}`, { recursive: true }) } catch {}
    }
}

export async function withTempTree({ files = {}, dirs = [], symlinks = {} } = {}, fn) {
    const uid = nextId()
    const root = await Deno.makeTempDir({ prefix: `denix_tt_${uid}_` })
    try {
        for (const d of dirs) {
            await Deno.mkdir(`${root}/${d}`, { recursive: true })
        }
        for (const [path, content] of Object.entries(files)) {
            const full = `${root}/${path}`
            const dir = full.replace(/\/[^/]+$/, "")
            if (dir !== full) await Deno.mkdir(dir, { recursive: true })
            await Deno.writeTextFile(full, content)
        }
        for (const [link, target] of Object.entries(symlinks)) {
            const full = `${root}/${link}`
            const dir = full.replace(/\/[^/]+$/, "")
            if (dir !== full) await Deno.mkdir(dir, { recursive: true })
            await Deno.symlink(target, full)
        }
        return await fn({ root })
    } finally {
        try { await Deno.remove(root, { recursive: true }) } catch {}
    }
}
