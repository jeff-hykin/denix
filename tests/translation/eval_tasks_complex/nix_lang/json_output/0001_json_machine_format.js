#!/usr/bin/env -S deno run --allow-all
// Auto-generated from json.sh:36-37
// nix eval --json --expr '{ a.b.c = true; }'
// expect stdout to equal '{"a":{"b":{"c":true}}}'

import { runDenix } from "../../shared_tooling/index.js"

const expected = '{"a":{"b":{"c":true}}}'
const res = await runDenix(["--eval", "--json", "--expr", "{ a.b.c = true; }"])
const actual = (res.stdout || "").replace(/\n+$/, "")
if (actual !== expected) {
    console.error("FAIL: JSON machine format mismatch")
    console.error("  expected:", JSON.stringify(expected))
    console.error("  actual:  ", JSON.stringify(actual))
    console.error("  stderr:  ", res.stderr.trimEnd())
    Deno.exit(1)
}
