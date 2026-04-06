#!/usr/bin/env -S deno run --allow-all
// Auto-generated from absolute-path-literals.sh:11
// NIX_CONFIG='lint-absolute-path-literals = warn' nix eval --expr '/tmp/bar'
// expect stderr to contain "absolute path literals are not portable"

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--expr", "/tmp/bar"], {
    env: { NIX_CONFIG: "lint-absolute-path-literals = warn" },
})
if (!res.stderr.includes("absolute path literals are not portable")) {
    console.error("FAIL: expected stderr to contain 'absolute path literals are not portable'")
    console.error("  actual stderr:", res.stderr.trimEnd())
    Deno.exit(1)
}
