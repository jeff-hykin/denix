#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nix_lang_tests/tests/functional/nix_path.sh:16
// [[ $(nix-instantiate --find-file by-relative-path/simple.nix) = $PWD/simple.nix ]]

import { runDenix } from "../../shared_tooling/index.js"

const SOURCE_ROOT = "/Users/jeffhykin/repos/denix/tests/nix_tests/nix_lang_tests/tests/functional"
const env = {
    NIX_PATH: `non-existent=/non-existent/but-unused-anyways:by-absolute-path=${SOURCE_ROOT}:by-relative-path=.`,
}
const res = await runDenix(["--find-file", "by-relative-path/simple.nix"], { env, cwd: SOURCE_ROOT })
const actual = (res.stdout || "").replace(/\n+$/, "")
const expected = `${SOURCE_ROOT}/simple.nix`
if (actual !== expected || res.code !== 0) {
    console.error("FAIL: --find-file by-relative-path/simple.nix")
    console.error("  expected:", JSON.stringify(expected))
    console.error("  actual:  ", JSON.stringify(actual))
    console.error("  denix stderr:", (res.stderr || "").trimEnd())
    console.error("  denix exit:  ", res.code)
    Deno.exit(1)
}
