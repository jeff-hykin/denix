#!/usr/bin/env -S deno run --allow-all
// Auto-generated from short-path-literals.sh:39
// NIX_CONFIG='warn-short-path-literals = true' nix eval --no-warn-short-path-literals --expr 'test/file'
// expect stderr to NOT contain "relative path literal"

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--no-warn-short-path-literals", "--expr", "test/file"], {
    env: { NIX_CONFIG: "warn-short-path-literals = true" },
})
if (res.stderr.includes("relative path literal")) {
    console.error("FAIL: stderr should NOT contain 'relative path literal' when overridden by --no-warn-short-path-literals")
    console.error("  actual stderr:", res.stderr.trimEnd())
    Deno.exit(1)
}
