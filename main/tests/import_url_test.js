import { assertEquals, assertThrows } from "jsr:@std/assert"
import { builtins } from "../runtime.js"

// URL imports fetch synchronously (blocking subprocess), so the fixture server
// must live in a separate process — an in-process Deno.serve could never
// respond while the main thread is blocked.
const serverCode = `
const files = {
    "/root.nix": \`
        let
            helper = import ./lib/helper.nix;
        in
        {
            value = helper.answer * 2;
            helperAnswer = helper.answer;
        }
    \`,
    "/lib/helper.nix": \`
        let
            shared = import ../shared.nix;
        in
        { answer = shared.base + 1; }
    \`,
    "/shared.nix": "{ base = 20; }",
    "/data.json": '{ "count": 7 }',
    "/uses_json.nix": "(import ./data.json).count + 1",
}
Deno.serve({ port: 0, onListen: ({ port }) => console.log(port) }, (req) => {
    const body = files[new URL(req.url).pathname]
    return body === undefined ? new Response("not found", { status: 404 }) : new Response(body)
})
`

const child = new Deno.Command(Deno.execPath(), {
    args: ["eval", serverCode],
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
})

Deno.test("import - URL import evaluates the remote file", () => {
    const result = builtins.import(`${baseUrl}/shared.nix`)
    assertEquals(result.base, 20n)
})

Deno.test("import - relative imports inside a URL import resolve as URLs", () => {
    // root.nix imports ./lib/helper.nix which imports ../shared.nix — both
    // must resolve against their containing file's URL
    const result = builtins.import(`${baseUrl}/root.nix`)
    assertEquals(result.helperAnswer, 21n)
    assertEquals(result.value, 42n)
})

Deno.test("import - URL import of JSON file", () => {
    const result = builtins.import(`${baseUrl}/uses_json.nix`)
    assertEquals(result, 8n)
})

Deno.test("import - URL imports are cached (same object returned)", () => {
    const result1 = builtins.import(`${baseUrl}/shared.nix`)
    const result2 = builtins.import(`${baseUrl}/shared.nix`)
    assertEquals(result1 === result2, true)
})

Deno.test("import - URL import of missing file throws", () => {
    assertThrows(
        () => builtins.import(`${baseUrl}/does-not-exist.nix`),
        Error,
        "failed to fetch"
    )
})
