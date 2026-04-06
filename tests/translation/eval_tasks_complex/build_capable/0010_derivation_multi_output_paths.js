#!/usr/bin/env -S deno run --allow-all
// Test: Multi-output derivation has distinct output paths

import { runDenix } from "../shared_tooling/index.js"

const expr = `
  let d = derivation { name = "multi"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["out" "dev"]; };
  in d.out != d.dev
`
const res = await runDenix(["--eval", "--json", "--expr", expr])
const actual = (res.stdout || "").replace(/\n+$/, "")
if (actual !== "true" || res.code !== 0) {
    console.error("FAIL: multi-output derivation should have distinct paths")
    console.error("  actual:", actual)
    console.error("  stderr:", res.stderr?.trimEnd())
    Deno.exit(1)
}
