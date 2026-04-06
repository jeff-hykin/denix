#!/usr/bin/env -S deno run --allow-all
// Auto-generated from pure-eval.sh:38
// ~/foo should fail in eval

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--expr", "~/foo"])
if (res.code === 0) {
    console.error("FAIL: ~/foo should fail in eval")
    console.error("  stdout:", res.stdout)
    Deno.exit(1)
}
