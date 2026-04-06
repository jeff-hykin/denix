#!/usr/bin/env -S deno run --allow-all
// Auto-generated from json.sh:39-41
// nix eval --json --pretty --expr '{ a.b.c = true; }'
// expect stdout to match pretty-printed JSON

import { runDenix } from "../../shared_tooling/index.js"

const expected = `{
  "a": {
    "b": {
      "c": true
    }
  }
}`
const res = await runDenix(["--eval", "--json", "--pretty", "--expr", "{ a.b.c = true; }"])
const actual = (res.stdout || "").replace(/\n+$/, "")
if (actual !== expected) {
    console.error("FAIL: JSON pretty format mismatch")
    console.error("  expected:", JSON.stringify(expected))
    console.error("  actual:  ", JSON.stringify(actual))
    console.error("  stderr:  ", res.stderr.trimEnd())
    Deno.exit(1)
}
