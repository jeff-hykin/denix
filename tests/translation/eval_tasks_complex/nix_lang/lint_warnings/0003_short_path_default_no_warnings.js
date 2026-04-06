#!/usr/bin/env -S deno run --allow-all
// Auto-generated from short-path-literals.sh:15-16
// nix eval --expr 'test/subdir'
// expect stderr to NOT contain "relative path" or "path literal"

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--expr", "test/subdir"])
if (res.stderr.match(/relative path|path literal/)) {
    console.error("FAIL: stderr should NOT contain 'relative path' or 'path literal' by default")
    console.error("  actual stderr:", res.stderr.trimEnd())
    Deno.exit(1)
}
