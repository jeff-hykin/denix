#!/usr/bin/env -S deno run --allow-all
// Auto-generated from hash-path.sh:31
// try md5 "1234567890..." (8 repetitions) with FORMAT=base16

import { tryHash } from "../shared_tooling/index.js"

await tryHash({ algo: "md5", content: "12345678901234567890123456789012345678901234567890123456789012345678901234567890", expected: "57edf4a22be3c955ac49da2e2107b67a", format: "base16", label: "md5 repeated digits base16" })
