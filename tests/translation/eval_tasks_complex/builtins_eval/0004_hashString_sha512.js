#!/usr/bin/env -S deno run --allow-all
// builtins.hashString "sha512" "" == known sha512 of empty string

import { bashAssert } from "../shared_tooling/index.js"

await bashAssert({
    args: ["--eval", "--expr", `builtins.hashString "sha512" ""`],
    expected: `"cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e"`,
    label: "hashString sha512 empty string",
})
