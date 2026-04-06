#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nix_lang_tests/tests/functional/nix_path.sh:9
// nix-instantiate --eval -E '<by-absolute-path/simple.nix>' --restrict-eval
// With NIX_PATH=non-existent=/non-existent/but-unused-anyways:by-absolute-path=$PWD:by-relative-path=.

import { runDenix } from "../../shared_tooling/index.js"

const cwd = Deno.cwd()
const SOURCE_ROOT = "/Users/jeffhykin/repos/denix/tests/nix_tests/nix_lang_tests/tests/functional"
const env = {
    NIX_PATH: `non-existent=/non-existent/but-unused-anyways:by-absolute-path=${SOURCE_ROOT}:by-relative-path=.`,
}
const res = await runDenix(["--eval", "--expr", "<by-absolute-path/simple.nix>", "--restrict-eval"], { env, cwd: SOURCE_ROOT })
if (res.code !== 0) {
    console.error("FAIL: eval by-absolute-path with --restrict-eval")
    console.error("  denix stderr:", (res.stderr || "").trimEnd())
    console.error("  denix exit:  ", res.code)
    Deno.exit(1)
}
