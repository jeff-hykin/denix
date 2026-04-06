#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:26
// try md5 "a" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "md5", content: "a", expected: "0cc175b9c0f1b6a831c399e269772661", format: "base16", label: "md5 'a' base16" })
