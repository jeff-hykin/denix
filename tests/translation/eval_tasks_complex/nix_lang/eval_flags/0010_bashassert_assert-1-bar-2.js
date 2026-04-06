#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nix_lang_tests/tests/functional/eval.sh:36
// cmd: --eval --json -E {"assert"=1;bar=2;}
// expected: "{ \"assert\" = 1; bar = 2; }"

import { runDenix, AssertionError, printFailure } from "../../shared_tooling/index.js"

const denixArgs = ["--eval", "--json", "-E", "{\"assert\"=1;bar=2;}"]
const expected = "{ \"assert\" = 1; bar = 2; }"
const expectedRegex = "^\\{ \"assert\" = 1; bar = 2; \\}$"
const res = await runDenix(denixArgs)
const actual = (res.stdout || "").replace(/\n+$/, "")
const matched = new RegExp(expectedRegex).test(actual)
const ok = matched && res.code === 0
if (!ok) {
    const err = new AssertionError("bash-assertion mismatch", { denixRes: res, pattern: expectedRegex })
    console.error("FAIL:", "assert-1-bar-2")
    console.error("  args:   ", denixArgs.join(" "))
    console.error("  wanted: ", JSON.stringify(expected))
    console.error("  actual: ", JSON.stringify(actual))
    console.error("  denix stderr:", (res.stderr || "").trimEnd())
    console.error("  denix exit:  ", res.code)
    Deno.exit(1)
}
