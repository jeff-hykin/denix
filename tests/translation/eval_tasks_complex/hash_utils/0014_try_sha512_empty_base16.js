#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:41
// try sha512 "" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha512", content: "", expected: "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e", format: "base16", label: "empty sha512 base16" })
