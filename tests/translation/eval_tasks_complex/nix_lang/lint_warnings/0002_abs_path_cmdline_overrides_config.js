#!/usr/bin/env -S deno run --allow-all
// Auto-generated from absolute-path-literals.sh:15
// NIX_CONFIG='lint-absolute-path-literals = warn' nix eval --lint-absolute-path-literals ignore --expr '/tmp/bar'
// expect stderr to NOT contain "absolute path literal"

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--lint-absolute-path-literals", "ignore", "--expr", "/tmp/bar"], {
    env: { NIX_CONFIG: "lint-absolute-path-literals = warn" },
})
if (res.stderr.includes("absolute path literal")) {
    console.error("FAIL: stderr should NOT contain 'absolute path literal'")
    console.error("  actual stderr:", res.stderr.trimEnd())
    Deno.exit(1)
}
