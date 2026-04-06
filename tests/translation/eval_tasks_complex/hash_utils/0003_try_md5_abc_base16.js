#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:27
// try md5 "abc" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "md5", content: "abc", expected: "900150983cd24fb0d6963f7d28e17f72", format: "base16", label: "md5 'abc' base16" })
