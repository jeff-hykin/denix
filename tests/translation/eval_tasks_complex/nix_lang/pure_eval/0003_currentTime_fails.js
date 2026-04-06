#!/usr/bin/env -S deno run --allow-all
// Auto-generated from pure-eval.sh:20
// builtins.currentTime should fail in pure eval

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--expr", "builtins.currentTime"])
if (res.code === 0) {
    console.error("FAIL: builtins.currentTime should fail in pure eval mode")
    console.error("  stdout:", res.stdout)
    Deno.exit(1)
}
