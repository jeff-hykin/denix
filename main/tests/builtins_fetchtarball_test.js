import { assertEquals, assertRejects, assert, assertStringIncludes } from "jsr:@std/assert"
import { builtins } from "../runtime.js"
import { hashPathSync } from "../nar_hash.js"

// Serve a real tarball from a local HTTP server so tests are deterministic and
// offline-safe (previously these fetched httpbin random bytes, which can never
// be a valid gzip — the failures were masked by over-broad network catches).
// fetchTarball downloads synchronously (blocking subprocess), so the fixture
// server must live in a separate process — an in-process Deno.serve could
// never respond while the main thread is blocked.
const tempDir = await Deno.makeTempDir()
const tarPath = `${tempDir}/test.tar.gz`
{
    await Deno.mkdir(`${tempDir}/content/myproject`, { recursive: true })
    await Deno.writeTextFile(`${tempDir}/content/myproject/README.md`, "# Test Project\n\nHello, World!")
    await Deno.writeTextFile(`${tempDir}/content/myproject/file.txt`, "Test content")
    const { code } = await new Deno.Command("tar", {
        args: ["-czf", tarPath, "-C", `${tempDir}/content`, "myproject"],
    }).output()
    if (code !== 0) {
        throw new Error("Failed to create test tarball")
    }
}

const serverCode = `
const bytes = await Deno.readFile(Deno.args[0])
Deno.serve({ port: 0, onListen: ({ port }) => console.log(port) }, () => {
    return new Response(bytes, { headers: { "content-type": "application/gzip" } })
})
`
const child = new Deno.Command(Deno.execPath(), {
    args: ["eval", serverCode, tarPath],
    stdout: "piped",
    stderr: "null",
}).spawn()
const port = await (async () => {
    const reader = child.stdout.getReader()
    let text = ""
    while (!text.includes("\n")) {
        const { value, done } = await reader.read()
        if (done) {
            throw new Error("fixture server exited before printing its port")
        }
        text += new TextDecoder().decode(value)
    }
    return parseInt(text)
})()
const baseUrl = `http://localhost:${port}`
globalThis.addEventListener("unload", () => {
    try { child.kill() } catch { /* already gone */ }
    try { Deno.removeSync(tempDir, { recursive: true }) } catch { /* already gone */ }
})

Deno.test("fetchTarball - string URL argument", async () => {
    const result = await builtins.fetchTarball(`${baseUrl}/pkg-string.tar.gz`)

    assert(result.constructor.name === "Path" || typeof result === "string")
    const info = await Deno.stat(result.toString())
    assert(info.isDirectory)
})

Deno.test("fetchTarball - object argument with URL", async () => {
    const result = await builtins.fetchTarball({
        url: `${baseUrl}/pkg-object.tar.gz`,
        name: "test-package",
    })

    assert(result.constructor.name === "Path" || typeof result === "string")
    assertStringIncludes(result.toString(), "test-package")
})

Deno.test("fetchTarball - caching works", async () => {
    const url = `${baseUrl}/pkg-cached.tar.gz`

    const result1 = await builtins.fetchTarball(url)
    const result2 = await builtins.fetchTarball(url)

    assertEquals(result1.toString(), result2.toString())
})

Deno.test("fetchTarball - rejects wrong sha256 with hash mismatch", async () => {
    await assertRejects(
        async () => await builtins.fetchTarball({
            url: `${baseUrl}/pkg-badhash.tar.gz`,
            sha256: "0000000000000000000000000000000000000000000000000000000000000000",
        }),
        Error,
        "Hash mismatch"
    )
})

Deno.test("fetchTarball - accepts correct sha256 (NAR hash of unpacked tree)", async () => {
    const plain = await builtins.fetchTarball(`${baseUrl}/pkg-goodhash.tar.gz`)
    const narHex = hashPathSync(plain.toString()).replace(/^sha256:/, "")

    const result = await builtins.fetchTarball({
        url: `${baseUrl}/pkg-goodhash.tar.gz`,
        sha256: narHex,
    })

    assertEquals(result.toString(), plain.toString())
})

Deno.test("fetchTarball - default store name is 'source' (real Nix)", async () => {
    const result = await builtins.fetchTarball(`${baseUrl}/repo/archive/v1.0.0.tar.gz`)

    const path = result.toString()
    assert(path.endsWith("-source"), `expected basename ending in -source: ${path}`)
})
