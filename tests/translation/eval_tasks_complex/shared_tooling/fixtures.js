// fixtures.js — helpers to resolve paths into tests/translation/source_code/.

const sourceCodeRoot = new URL("../../source_code/", import.meta.url).pathname

export function resolveFixture(rel, fixtureRoot = "") {
    // rel may be absolute (returned as-is) or relative (resolved against
    // source_code/<fixtureRoot>/).
    if (rel.startsWith("/")) return rel
    const cleaned = rel.replace(/^\.\//, "")
    const base = fixtureRoot ? `${sourceCodeRoot}${fixtureRoot}/` : sourceCodeRoot
    return `${base}${cleaned}`
}

export function fixtureRootOf(fixtureRoot) {
    return `${sourceCodeRoot}${fixtureRoot}/`
}

export const SOURCE_CODE_ROOT = sourceCodeRoot
