#!/usr/bin/env -S deno run --allow-all
// Auto-generated from short-path-literals.sh:27
// nix eval --warn-short-path-literals --expr '/absolute/path'
// expect stderr to NOT contain "relative path literal"

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--warn-short-path-literals", "--expr", "/absolute/path"])
if (res.stderr.includes("relative path literal")) {
    console.error("FAIL: stderr should NOT contain 'relative path literal' for absolute paths")
    console.error("  actual stderr:", res.stderr.trimEnd())
    Deno.exit(1)
}
