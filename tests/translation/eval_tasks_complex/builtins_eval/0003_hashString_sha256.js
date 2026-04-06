#!/usr/bin/env -S deno run --allow-all
// builtins.hashString "sha256" "" == "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.hashString "sha256" ""`],
    expected: `"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"`,
    label: "hashString sha256 empty string",
})
