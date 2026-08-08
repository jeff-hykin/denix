#!/usr/bin/env deno run --allow-all
/**
 * Recursive flake inputs: a flake can reference ANOTHER flake (its `inputs`),
 * and use that input's outputs (values and functions). Uses local path flakes
 * so the test is deterministic (no network); github/git inputs go through the
 * same recursion + the real fetchers.
 */

import { createRuntime, builtins, force } from "../runtime.js"
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

createRuntime()

Deno.test("a flake resolves another flake as an input and uses its outputs", async () => {
    const root = await Deno.makeTempDir({ prefix: "denix_flake_inputs_" })
    const bDir = `${root}/b`
    const aDir = `${root}/a`
    await Deno.mkdir(bDir, { recursive: true })
    await Deno.mkdir(aDir, { recursive: true })

    await Deno.writeTextFile(`${bDir}/flake.nix`, `{
        outputs = { self }: {
            value = "hello from B";
            lib.double = x: x * 2;
        };
    }`)
    await Deno.writeTextFile(`${aDir}/flake.nix`, `{
        inputs.b.url = "path:${bDir}";
        outputs = { self, b }: {
            fromB = b.value;
            doubled = b.lib.double 21;
        };
    }`)

    const a = await builtins.getFlake(`path:${aDir}`)

    // The input was actually resolved to a flake (not a stub).
    assertEquals(a.inputs.b._type, "flake")
    // A uses B's value and B's function across the flake boundary.
    assertEquals(force(a.outputs.fromB), "hello from B")
    assertEquals(force(a.outputs.doubled), 42n)
    // Outputs are also exposed at the top level (Nix style).
    assertEquals(force(a.fromB), "hello from B")

    await Deno.remove(root, { recursive: true })
})

Deno.test("input cycle (A -> B -> A) resolves without infinite recursion", async () => {
    const root = await Deno.makeTempDir({ prefix: "denix_flake_cycle_" })
    const aDir = `${root}/a`
    const bDir = `${root}/b`
    await Deno.mkdir(aDir, { recursive: true })
    await Deno.mkdir(bDir, { recursive: true })
    await Deno.writeTextFile(`${aDir}/flake.nix`, `{
        inputs.b.url = "path:${bDir}";
        outputs = { self, b }: { name = "A"; };
    }`)
    await Deno.writeTextFile(`${bDir}/flake.nix`, `{
        inputs.a.url = "path:${aDir}";
        outputs = { self, a }: { name = "B"; };
    }`)

    const a = await builtins.getFlake(`path:${aDir}`)
    assertEquals(force(a.outputs.name), "A")
    assertEquals(a.inputs.b._type, "flake")

    await Deno.remove(root, { recursive: true })
})

// Network test: a flake references a real github flake as an input.
// Gated behind DENIX_NETWORK_TESTS=1 so the default suite stays offline.
// nix-systems/default is a tiny, input-less flake.
Deno.test({
    name: "flake references a github flake over the network",
    ignore: Deno.env.get("DENIX_NETWORK_TESTS") !== "1",
    fn: async () => {
        const root = await Deno.makeTempDir({ prefix: "denix_flake_gh_" })
        await Deno.writeTextFile(`${root}/flake.nix`, `{
            inputs.systems.url = "github:nix-systems/default";
            outputs = { self, systems }: { ok = systems._type; };
        }`)
        const f = await builtins.getFlake(`path:${root}`)
        assertEquals(f.inputs.systems._type, "flake")
        assertEquals(f.inputs.systems.sourceInfo.type, "github")
        await Deno.remove(root, { recursive: true })
    },
})

Deno.test("inputs.X.follows dedupes to a sibling input", async () => {
    const root = await Deno.makeTempDir({ prefix: "denix_flake_follows_" })
    await Deno.mkdir(`${root}/dep`, { recursive: true })
    await Deno.mkdir(`${root}/m`, { recursive: true })
    await Deno.writeTextFile(`${root}/dep/flake.nix`, `{ outputs = { self }: { tag = "DEP"; }; }`)
    await Deno.writeTextFile(`${root}/m/flake.nix`, `{
        inputs.a.url = "path:${root}/dep";
        inputs.b.follows = "a";
        outputs = { self, a, b }: { aTag = a.tag; bTag = b.tag; };
    }`)

    const f = await builtins.getFlake(`path:${root}/m`)
    assertEquals(force(f.outputs.bTag), "DEP")
    assertEquals(f.inputs.b, f.inputs.a) // b IS a

    await Deno.remove(root, { recursive: true })
})

Deno.test("flake.lock pins inputs (overrides the spec url)", async () => {
    const root = await Deno.makeTempDir({ prefix: "denix_flake_lock_" })
    for (const [d, t] of [["depA", "A"], ["depB", "B"]]) {
        await Deno.mkdir(`${root}/${d}`, { recursive: true })
        await Deno.writeTextFile(`${root}/${d}/flake.nix`, `{ outputs = { self }: { tag = "${t}"; }; }`)
    }
    await Deno.mkdir(`${root}/m`, { recursive: true })
    await Deno.writeTextFile(`${root}/m/flake.nix`, `{
        inputs.x.url = "path:${root}/depA";
        outputs = { self, x }: { xTag = x.tag; };
    }`)
    // The lock pins x to depB, which must win over the url (depA).
    await Deno.writeTextFile(`${root}/m/flake.lock`, JSON.stringify({
        version: 7, root: "root",
        nodes: {
            root: { inputs: { x: "x" } },
            x: { locked: { type: "path", path: `${root}/depB` } },
        },
    }))

    const f = await builtins.getFlake(`path:${root}/m`)
    assertEquals(force(f.outputs.xTag), "B")

    await Deno.remove(root, { recursive: true })
})

// getFlake has to be synchronous: called from nix source an async version
// would silently evaluate to a Promise (so `.outputs` came back undefined).
Deno.test("getFlake is callable from inside nix source", async () => {
    const root = await Deno.makeTempDir({ prefix: "denix_flake_sync_" })
    await Deno.writeTextFile(`${root}/flake.nix`, `{
        description = "a tiny flake";
        outputs = { self }: { greeting = "hi"; };
    }`)

    const { apply, evalNix } = createRuntime()
    const describe = await evalNix(`
        name:
            let
                flake = builtins.getFlake "path:${root}";
            in
                {
                    inherit name;
                    description = flake.description;
                    outputNames = builtins.attrNames flake.outputs;
                }
    `)
    const described = apply(describe, "hi")
    assertEquals(force(described.description), "a tiny flake")
    assertEquals(described.outputNames.map((each) => force(each)), ["greeting"])

    await Deno.remove(root, { recursive: true })
})
