#!/usr/bin/env -S deno run --allow-all
// Auto-generated from pure-eval.sh:17
// builtins.pathExists on a non-authorised path should return false

import { bashAssert } from "../../shared_tooling/index.js"

const SOURCE_ROOT = "/Users/jeffhykin/repos/denix/tests/nix_tests/nix_lang_tests/tests/functional"

await bashAssert({
    args: ["--eval", "--expr", `builtins.pathExists ${SOURCE_ROOT}/pure-eval.sh`],
    expected: "false",
    label: "pathExists on non-authorised path returns false",
})
