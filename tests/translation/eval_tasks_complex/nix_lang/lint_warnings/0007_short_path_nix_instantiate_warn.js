#!/usr/bin/env -S deno run --allow-all
// Auto-generated from short-path-literals.sh:31
// nix-instantiate --warn-short-path-literals --eval -E 'foo/bar'
// expect stderr to contain "relative path literal 'foo/bar' should be prefixed"

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--warn-short-path-literals", "--expr", "foo/bar"])
if (!res.stderr.includes("relative path literal 'foo/bar' should be prefixed")) {
    console.error("FAIL: expected stderr to contain \"relative path literal 'foo/bar' should be prefixed\"")
    console.error("  actual stderr:", res.stderr.trimEnd())
    Deno.exit(1)
}
