#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:34
// try sha1 "abc" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "sha1", content: "abc", expected: "a9993e364706816aba3e25717850c26c9cd0d89d", format: "base16", label: "sha1 'abc' base16" })
