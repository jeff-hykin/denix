#!/usr/bin/env -S deno run --allow-all
// Auto-generated from pure-eval.sh:23
// nix-instantiate --pure-eval ./simple.nix should fail

import { runDenix } from "../../shared_tooling/index.js"

const SOURCE_ROOT = "/Users/jeffhykin/repos/denix/tests/nix_tests/nix_lang_tests/tests/functional"

const res = await runDenix(["--eval", "--pure-eval", `${SOURCE_ROOT}/simple.nix`])
if (res.code === 0) {
    console.error("FAIL: --pure-eval simple.nix should fail")
    console.error("  stdout:", res.stdout)
    Deno.exit(1)
}
