#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:25
// try md5 "" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "md5", content: "", expected: "d41d8cd98f00b204e9800998ecf8427e", format: "base16", label: "empty md5 base16" })
