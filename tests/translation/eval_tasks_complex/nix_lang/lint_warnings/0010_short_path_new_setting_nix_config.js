#!/usr/bin/env -S deno run --allow-all
// Auto-generated from short-path-literals.sh:45
// NIX_CONFIG='lint-short-path-literals = warn' nix eval --expr 'test/file'
// expect stderr to contain "relative path literal 'test/file' should be prefixed"

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--expr", "test/file"], {
    env: { NIX_CONFIG: "lint-short-path-literals = warn" },
})
if (!res.stderr.includes("relative path literal 'test/file' should be prefixed")) {
    console.error("FAIL: expected stderr to contain \"relative path literal 'test/file' should be prefixed\"")
    console.error("  actual stderr:", res.stderr.trimEnd())
    Deno.exit(1)
}
