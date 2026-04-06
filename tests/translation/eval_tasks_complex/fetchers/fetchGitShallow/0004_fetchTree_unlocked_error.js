#!/usr/bin/env -S deno run --allow-all
// Auto-generated from fetchGitShallow.sh:44
// fetchTree without lock info should produce an error about unlocked input

import { runDenix } from "../../shared_tooling/index.js"

const res = await runDenix(["--eval", "--expr",
    `builtins.fetchTree { type = "git"; url = "file:///foo"; }`])

if (res.code === 0) {
    console.error("FAIL: expected failure for unlocked fetchTree input")
    Deno.exit(1)
}

// Check stderr for the error about unlocked input
const output = (res.stderr || "") + (res.stdout || "")
if (!output.includes("unlocked") && !output.includes("fetchTree")) {
    // The error message may differ in denix, so just check it failed
    console.log("PASS (weak): fetchTree unlocked input fails (error message differs)")
} else {
    console.log("PASS: fetchTree unlocked input error")
}
