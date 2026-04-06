#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:28
// try md5 "message digest" with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "md5", content: "message digest", expected: "f96b697d7cb7938d525a2f31aaf161d0", format: "base16", label: "md5 'message digest' base16" })
