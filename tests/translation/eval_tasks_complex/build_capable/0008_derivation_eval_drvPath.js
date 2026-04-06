#!/usr/bin/env -S deno run --allow-all
// Test: Evaluating a derivation returns a .drvPath that looks like /nix/store/...

import { runDenix } from "../shared_tooling/index.js"

const res = await runDenix(["--eval", "--json", "--expr",
    '(derivation { name = "hello"; system = "x86_64-linux"; builder = "/bin/sh"; }).drvPath'])
const actual = (res.stdout || "").replace(/\n+$/, "")
const storePathRe = /^"\/nix\/store\/[a-z0-9]{32}-hello\.drv"$/
if (!storePathRe.test(actual) || res.code !== 0) {
    console.error("FAIL: derivation .drvPath should be a valid store path")
    console.error("  actual:", actual)
    console.error("  stderr:", res.stderr?.trimEnd())
    Deno.exit(1)
}
