#!/usr/bin/env -S deno run --allow-all
// Auto-generated from tests/nix_tests/nix_lang_tests/tests/functional/eval.sh:30
// cmd: --eval --json ./eval.nix -A int
// expected: "123"

import { runDenix, AssertionError, printFailure } from "../../shared_tooling/index.js"

const denixArgs = ["--eval", "--json", "/Users/jeffhykin/repos/denix/tests/nix_tests/nix_lang_tests/tests/functional/eval.nix", "-A", "int"]
const expected = "123"
const expectedRegex = "^123$"
const res = await runDenix(denixArgs)
const actual = (res.stdout || "").replace(/\n+$/, "")
const matched = new RegExp(expectedRegex).test(actual)
const ok = matched && res.code === 0
if (!ok) {
    const err = new AssertionError("bash-assertion mismatch", { denixRes: res, pattern: expectedRegex })
    console.error("FAIL:", "int")
    console.error("  args:   ", denixArgs.join(" "))
    console.error("  wanted: ", JSON.stringify(expected))
    console.error("  actual: ", JSON.stringify(actual))
    console.error("  denix stderr:", (res.stderr || "").trimEnd())
    console.error("  denix exit:  ", res.code)
    Deno.exit(1)
}
